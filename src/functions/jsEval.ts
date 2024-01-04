import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Evaluates JavaScript code.',
    parameters: [
        {
            name: 'Return results',
            description: 'Whether return evaluation results.',
            required: true,
            resolver: 'Boolean',
            value: 'none'
        },
        {
            name: 'Code',
            description: 'JavaScript code.',
            required: true,
            // compile: false,
            // rest: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [returnResults = 'false', ...codes]) {
        if (returnResults === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        if (codes[0] === undefined) throw new d.error(d, 'required', 'code', d.function?.name!)
        
        let result: string

        try {
            result = eval(codes.join(';'))
        } catch (e: any) {
            result = e
        }

        if (returnResults === 'true' && result)
            return typeof result === 'string' ? result
                : typeof result === 'object' ? inspect(result, { depth: 4 })
                : result
    }
})