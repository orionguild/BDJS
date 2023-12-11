import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check if the provided variable name exists in the records.',
    code: async function(d, [name, table = 'main']) {
        if (name === undefined) throw new d.error(d, 'required', 'Variable Name', d.function?.name!)
        if (!d.bot?.vars.checkVar(name, table)) throw new d.error(d, 'invalid', 'Variable Name', d.function?.name!)

        return await d.bot.vars.has(name, table)
    }
})