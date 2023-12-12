import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check whether a string ends with some of the provided words.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Values',
            description: 'Words to be checked.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [text, ...values]) {
        if (text === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        if (values[0] === undefined) throw new d.error(d, 'required', 'values', d.function?.name!)
        
        return values.some(word => text.endsWith(word))
    }
})