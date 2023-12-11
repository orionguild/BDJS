import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Get a variable value from the records.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name to be retrieved.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Table',
            description: 'The database table name.',
            required: false,
            resolver: 'String',
            value: 'main'
        }
    ],
    code: async function(d, [name, table = 'main']) {
        if (name === undefined) throw new d.error(d, 'required', 'Variable Name', d.function?.name!)
        if (!d.bot?.vars.checkVar(name, table)) throw new d.error(d, 'invalid', 'Variable Name', d.function?.name!)

        const value = await d.bot.vars.get(name, table) as string

        return value
    }
})