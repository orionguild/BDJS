const { RawFunction, RawString } = require('./Structures')
const { Data } = require('../index')

/**
 * @typedef CompiledData
 * @property {RawFunction[]} functions
 * @property {RawFunction} function
 * @property {RawString[]} strings
 * @property {RawString} string
 * @property {number} depth
 * @property {string} type
 * @property {RawString} temp
 */

/**
 * Check if the provided string is word.
 * @param {string} t The string to test.
 * @returns {boolean}
 */
const isWord = (t) => /\w/.test(t)

/**
 * BDJS code reader.
 */
class Reader {
    /**
     * Reads BDJS code.
     * @param {string} code BDJS code to read.
     * @param {Data} data Environment data.
     * @returns {Promise<Data>}
     */
    async compile(code, data) {
        const lines = code.split('\n').map(line => line.trim())

        /**
         * Compiled data.
         * @type {CompiledData}
         */
        let compiled = {
            functions: [],
            strings: [],
            function: new RawFunction,
            string: new RawString,
            depth: 0,
            type: 'any',
            temp: new RawString
        }
        
        // Reading each line.
        for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex - 1]

            // Reading each line character.
            for (let i = 0; i < line.length; i++) {
                const char = line[i], next = line[i + 1]

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
                        if ([' ', '\n'].includes(char)) {
                            compiled.function.setName(compiled.temp.value)
                            .setLine(lineIndex)
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
                        } else if ('[' === char) {
                            compiled.type = 'function:parameters'
                            compiled.function.setName(compiled.temp.value)
                            .setLine(lineIndex)
                            .setIndex(compiled.functions.length);
                            compiled.temp = new RawString
                        } else compiled.temp.write(char)
                    } else {
                        if ('[' === char) compiled.depth++
                        else if (']' === char) compiled.depth--

                        if (';' === char && compiled.depth <= 0) {
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

        }

        if (compiled.string.isEmpty === false) {
            compiled.strings.push(compiled.string)
            compiled.string = new RawString
        }

        if (compiled.function.name !== '') {
            compiled.functions.push(compiled.function)
            compiled.function = new RawFunction
        }

        /** @type {string[]} */
        let parsedFunctions = []

        for (const dfunc of compiled.functions) {
            const spec = data.client.functions.get(dfunc.name.toLowerCase())
        }

        data.setCode(compiled.strings.map(x => x.value).join(''))
        data.compiled = compiled
        return data
    }
}

module.exports = { Reader }