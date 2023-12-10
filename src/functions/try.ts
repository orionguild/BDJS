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

        try {
            const res = await d.reader.compile(code, d)
            if (res?.code) results.push(res.code)
        } catch (e: any) {
            const data = d.extend(d)
            data.functions.set('error',
                new BaseFunction({
                    description: 'Retrieves a property from the error.',
                    code: async function(extended, [property = 'message']) {
                        const properties = ['message', 'stack', 'raw']
                        if (!properties.includes(property.toLowerCase()))
                            throw new extended.error(d, 'invalid', 'property', extended.function?.name!)
                        
                        const error = inspect(property.toLowerCase() === 'raw' ? e : e[property], { depth: 4 })

                        return error
                    }
                })
            );

            const res = await data.reader.compile(catchCode, data)
            if (res?.code) results.push(res.code)
        } finally {
            if (finallyCode) {
                const res = await d.reader.compile(finallyCode, d)
                if (res?.code) results.push(res.code)
            }
        }

        return results.join(sep)
    }
})