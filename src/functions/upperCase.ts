import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Converts a string to uppercase.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to convert.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [text]) {
        if (text === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        return text.toUpperCase()
    }
})