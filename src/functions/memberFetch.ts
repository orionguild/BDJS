import { BaseFunction } from '../structures/Function'
import { GuildMember } from 'discord.js'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Fetch a guild member property.',
    parameters: [
        {
            name: 'Property',
            description: 'Member property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Member ID',
            description: 'Guild member ID to fetch the property from.',
            required: true,
            resolver: 'String',
            value: 'd.ctx?.user?.id'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild where member should be retrieved.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function(d, [property, memberID = d.ctx?.user?.id, guildID = d.ctx?.guild?.id]) {
        if (property === undefined) throw new d.error(d, 'required', 'Property Name', d.function?.name!)
        if (memberID === undefined) throw new d.error(d, 'invalid', 'member ID', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild', d.function?.name!)

        const member = await guild.members.fetch(memberID) as GuildMember & Record<string, string>
        if (!member) throw new d.error(d, 'invalid', 'member', d.function?.name!)

        const types = Object.keys(member).concat(['isBot'])
        if (!types.includes(property)) throw new d.error(d, 'invalid', 'Property', d.function?.name!)

        return property === 'isBot' ? member.user.bot : typeof member[property] === 'string' ? member[property] : typeof member[property] === 'number' ? member[property].toString() : inspect(member[property])
    }
})