import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Returns the amount of variables in a table.',
    parameters: [
        {
            name: 'Table',
            description: 'The variables table.',
            required: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [text = 'main']) {
        if (text === undefined)
            throw new d.error(d, 'required', 'Table Name', d.function!.name)
        if (!(text in d.bot!.vars._data))
            throw new d.error(d, 'invalid', 'Table Name', d.function!.name)

        return Object.keys(d.bot!.vars.getTable(text)).length
    }
})