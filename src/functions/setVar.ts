import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Set a variable value in the database.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name to be deleted.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Value',
            description: 'The variable value.',
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
    code: async function(d, [name, value, table = 'main']) {
        if (name === undefined) throw new d.error(d, 'required', 'Variable Name', d.function?.name!)
        if (!d.bot?.vars.checkVar(name, table)) throw new d.error(d, 'invalid', 'Variable Name', d.function?.name!)

        await d.bot.vars.set(name, value, table)
        
    }
})