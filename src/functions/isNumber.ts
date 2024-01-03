import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check whether content is number.',
    parameters: [
        {
            name: 'Number',
            description: 'Number to be tested.',
            required: true,
            value: 'none'
        }
    ],
    code: async function(d, [text]) {
        if (text === undefined)
            throw new d.error(d, 'required', 'Number', d.function!.name)
        return !isNaN(Number(text))
    }
})