import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import { GuildMember } from 'discord.js'

export default new BaseFunction({
    description: 'Get information from a new member.',
    parameters: [
        {
            name: 'Property',
            description: 'The property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [property]) {
        if (d.commandType !== 'memberUpdate')
            throw new d.error(d, 'disallowed', d.function!.name, 'onGuildMemberUpdate event')
        if (property === undefined)
            throw new d.error(d, 'required', 'Property', d.function!.name)

        const types = Object.keys(Properties.Channel)
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function!.name)

        const member = d.getEnvironmentVariable('__BDJS__NEW__MEMBER') as GuildMember

        return Properties.Member[property.toLowerCase()].code(member)
    }
})