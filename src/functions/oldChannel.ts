import { NonThreadGuildBasedChannel } from 'discord.js'
import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'

export default new BaseFunction({
    description: 'Get information from an old channel.',
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
        if (d.commandType !== 'channelUpdate')
            throw new d.error(d, 'disallowed', d.function!.name, 'onChannelUpdate event')
        if (property === undefined)
            throw new d.error(d, 'required', 'Property', d.function!.name)

        const types = Object.keys(Properties.Channel)
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function!.name)

        const channel = d.getEnvironmentVariable('__BDJS__OLD__CHANNEL__') as NonThreadGuildBasedChannel

        return Properties.Channel[property.toLowerCase()].code(channel as any)
    }
})