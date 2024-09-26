import { Data } from '../structures/Data'
import { RawFunction, RawString } from './Structures'
import { BaseFieldOptions, BaseFunction } from '../structures/Function'
import { BDJSLog } from '../util/BDJSLog'

/**
 * Represents the compiled data by BDJS reader.
 */
export interface CompiledData {
    functions: RawFunction[]
    function: RawFunction
    strings: RawString[]
    string: RawString
    temp: RawString
    depth: number
    line: number
    type: string
}

/**
 * Check if the provided string is word.
 * @param {string} t The string to test.
 * @returns {boolean}
 */
function isWord(t: string) {
    return /\w/.test(t)
}

const escapers = [
    ['%SEMI%', ';'],
    ['%COLON%', ':'],
    ['%LEFT%', '['],
    ['%RIGHT%', ']'],
    ['%DOL%', '$']
]

/**
 * Escape a text.
 * @param text - The text to escape.
 * @returns {string}
 */
function EscapeText(text: string) {
    for (const escaper of escapers) {
        text = text.replace(new RegExp(`${escaper[1]}`, 'ig'), escaper[0])
    }
    return text
}

/**
 * Unescape a text.
 * @param text - The text to escape.
 * @returns {string}
 */
function UnescapeText(text: string) {
    for (const escaper of escapers) {
        text = text.replace(new RegExp(`${escaper[0]}`, 'ig'), escaper[1])
    }
    return text
}

/**
 * Removes unsafe text from code results.
 * @param text - Text to be enhanced.
 * @returns {string}
 */
function removeUnsafeText(text: string) {
    return text.replace(/(\(call_\d+\))/g, '')
}

/**
 * BDJS code reader.
 */
export class Reader {
    /**
     * Reads BDJS code.
     * @param {string} code BDJS code to read.
     * @param {Data} data Environment data.
     * @returns {Promise<Data>}
     */
    async compile(code: string, data: Data) {
        data.setEnvironmentVariable('__BDJS__PERFORMANCE__', performance.now())

        const lines = code.trim().split('\n').map(line => line.trim()).join('\n')

        let compiled: CompiledData = {
            functions: [],
            strings: [],
            function: new RawFunction,
            string: new RawString,
            depth: 0,
            line: 1,
            type: 'any',
            temp: new RawString
        }

        // Reading each line character.
        for (let i = 0; i < lines.length; i++) {
            const char = lines[i], next = lines[i + 1]

            if (char === '\n') compiled.line++

            if ('[' === char) compiled.depth++
            else if (']' === char) compiled.depth--

            if (compiled.type === 'any') {
                if ('$' === char && isWord(next)) {
                    compiled.temp.write(char)
                    compiled.type = 'function:name'
                    if (compiled.string.isEmpty === false) {
                        compiled.strings.push(compiled.string)
                        compiled.string = new RawString
                    }
                } else compiled.string.write(char)
            } else {
                const [start, mode] = compiled.type.split(':')
                if (mode === 'name') {
                    if (!/\w/.test(char) && char !== '[') {
                        compiled.function.setName(compiled.temp.value)
                            .setLine(compiled.line)
                            .setIndex(compiled.functions.length)
                            .setClosed(true);
                        compiled.strings.push(
                            new RawString().overwrite(
                                `(call_${compiled.functions.length})`
                            )
                        )
                        compiled.functions.push(compiled.function)
                        compiled.function = new RawFunction
                        compiled.temp = new RawString
                        compiled.type = 'any'
                        compiled.string.write(char)
                    } else if ('[' === char) {
                        compiled.type = 'function:parameters'
                        compiled.function.setName(compiled.temp.value)
                            .setLine(compiled.line)
                            .setIndex(compiled.functions.length);
                        compiled.temp = new RawString
                    } else compiled.temp.write(char)
                } else if (mode === 'parameters') {
                    if (';' === char && compiled.depth <= 1) {
                        compiled.function.addField(
                            compiled.temp.value
                        )
                        compiled.temp = new RawString
                    } else if (']' === char && compiled.depth <= 0) {
                        compiled.function.addField(
                            compiled.temp.value
                        ).setClosed(true);
                        compiled.strings.push(
                            new RawString().overwrite(
                                `(call_${compiled.functions.length})`
                            )
                        )
                        compiled.functions.push(compiled.function)
                        compiled.function = new RawFunction
                        compiled.temp = new RawString
                        compiled.type = 'any'
                    } else compiled.temp.write(char)
                }
            }

        }

        if (compiled.string.isEmpty === false) {
            compiled.strings.push(compiled.string)
            compiled.string = new RawString
        }

        if (compiled.function.name !== '') {
            compiled.functions.push(compiled.function)
            compiled.function = new RawFunction
        }

        if (
            compiled.temp.value.startsWith('$')
            &&
            compiled.type.startsWith('function')
        ) {
            compiled.strings.push(
                new RawString().overwrite(
                    `(call_${compiled.functions.length})`
                )
            )

            const rest = new RawFunction()
                .setName(compiled.temp.value)
                .setClosed(true)
                .setIndex(compiled.functions.length)
                .setLine(compiled.line);

            compiled.functions.push(rest)
            compiled.temp = new RawString
            compiled.type = 'any'
        }

        let parsedFunctions: string[] = [], texts = compiled.strings.map(str => str.value)

        for (const dfunc of compiled.functions) {
            if (data.bot?.extraOptions.debug === true) BDJSLog.debug(`Parsing ${dfunc.name} => ${dfunc.toString}`)
            if (data.stop) break

            const spec = data.functions.get(dfunc.name.slice(1).toLowerCase())
            const functionData = { name: dfunc.name, ...spec } as BaseFunction & { name: string }
            data.function = functionData

            if (!spec) throw new data.error(data, 'custom', [
                '"' + dfunc.name + '" is not a function.',
                '|-> Please provide a valid function name at:',
                '|-> Line: ' + dfunc.line,
                '|-> Source: "' + dfunc.toString + '"',
                '|--------------------------------------------'
            ].join('\n'))

            if (dfunc.closed === false) throw new data.error(data, 'custom', [
                '"' + dfunc.name + '" is not a closed.',
                '|-> Please make sure to close function fields at:',
                '|-> Line: ' + dfunc.line,
                '|-> Source: "' + dfunc.toString + '"',
                '|-------------------------------------------------'
            ].join('\n'))

            let fields = dfunc.fields.map(field => field.value),
                newFields: string[] = []

            for (let idx = 0; idx < fields.length; idx++) {
                const field = fields[idx]
                const compile =
                    typeof spec.parameters?.[idx] === 'undefined' ? true
                        : 'compile' in spec.parameters[idx]
                            ? spec.parameters[idx].compile === true : true;

                const parsed = compile ? (await data.reader.compile(field, data))?.code ?? '' : field
                newFields.push(Reader.unescapeParam(parsed, spec.parameters?.[idx]))
            }

            const result = await spec.code(data, newFields).catch(e => {
                if (data.bot?.extraOptions.events.includes('onError'))
                    data.bot.emit('error', e);
                throw e
            })

            parsedFunctions[parsedFunctions.length] = result === undefined ? '' : result
        }

        parsedFunctions.forEach((text, index) => {
            if (data.bot?.extraOptions.debug === true)
                BDJSLog.debug(`Replacing overload "(call_${index})" to "${text === '' ? 'none' : text}"`)

            texts[texts.indexOf(`(call_${index})`)] = text
        })

        data.setCode(removeUnsafeText(texts.join('').trim()))
        data.compiled = compiled
        return data as Data
    }

    /**
     * Unescapes a function parameter.
     * @param self - The parameter value.
     * @param spec - Parameter specificaction.
     * @returns {string}
     */
    static unescapeParam(self: string, spec?: BaseFieldOptions) {
        const allowed =
            typeof spec === 'undefined' ? true
                : 'unescape' in spec ? spec.unescape === true : true

        return allowed ? UnescapeText(self) : self
    }
}