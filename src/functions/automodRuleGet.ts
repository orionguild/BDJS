import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'

export default new BaseFunction({
    description: 'Get an automoderation rule property.',
    parameters: [
        {
            name: 'Property',
            description: 'Guild property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Rule ID',
            description: 'Rule ID to get the property from.',
            required: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'Guild ID to get the property from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function(d, [property, ruleID, guildID = d.ctx?.guild?.id]) {
        if (property === undefined) throw new d.error(d, 'required', 'Property Name', d.function?.name!)
        if (ruleID === undefined) throw new d.error(d, 'invalid', 'Rule ID', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        if (property.toLowerCase() === 'exists') return d.bot?.guilds.cache.has(guildID)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild', d.function?.name!)

        const rule = await d.util.getAutomodRule(guild, ruleID)
        if (!rule) throw new d.error(d, 'invalid', 'Rule', d.function?.name!)

        const types = Object.keys(Properties.AutomodRule)
        if (!types.includes(property.toLowerCase())) throw new d.error(d, 'invalid', 'Property', d.function?.name!)
        
        return Properties.AutomodRule[property.toLowerCase()].code(rule)
    }
})