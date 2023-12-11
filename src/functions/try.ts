import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Allows you to handle and manage errors and exceptions in a code.',
    parameters: [
        {
            name: 'Code',
            description: 'The code to try first.',
            required: true,
            resolver: 'String',
            compile: false,
            value: 'none'
        },
        {
            name: 'Catch code',
            description: 'The code to execute something goes wrong.',
            required: true,
            resolver: 'String',
            compile: false,
            value: 'none'
        },
        {
            name: 'Finally code',
            description: 'The code to execute if the condition is false.',
            required: false,
            resolver: 'String',
            compile: false,
            value: 'none'
        },
        {
            name: 'Separator',
            description: 'Code result separator.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function(d, [code, catchCode, finallyCode, sep = ',']) {
        if (code === undefined) throw new d.error(d, 'required', 'code', d.function?.name!)
        if (catchCode === undefined) throw new d.error(d, 'required', 'catch code', d.function?.name!)

        const results: string[] = []

        d.reader.compile(code, d).then((compiled) => {
            if (compiled.code !== '') results.push(compiled.code)
        }).catch(async (e) => {
            const data = d.extend(d)
            data.functions.set('error',
                new BaseFunction({
                    description: 'Retrieves a property from the error.',
                    code: async function(subdata, [property = 'message']) {
                        const properties = ['message', 'stack', 'raw']
                        if (!properties.includes(property.toLowerCase()))
                            throw new subdata.error(d, 'invalid', 'property', subdata.function?.name!)
                        
                        const error = inspect(property.toLowerCase() === 'raw' ? e : e[property], { depth: 4 })

                        return error
                    }
                })
            );

            const compiled = await data.reader.compile(catchCode, data)
            if (compiled.code !== '') results.push(compiled.code)
        })

        if (finallyCode) {
            const compiled = await d.reader.compile(finallyCode, d)
            if (compiled.code !== '') results.push(compiled.code)
        }

        return results.join(sep)
    }
})