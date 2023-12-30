import { BaseFunction } from '../structures/Function'
import { Container } from '../structures/Container'
import { GuildTextBasedChannel } from 'discord.js'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Retrieves data from an embed message.',
    parameters: [
        {
            name: 'Message',
            description: 'The message payload.',
            required: true,
            compile: false,
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'Guild ID where message is in.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        },
        {
            name: 'Channel ID',
            description: 'Channel ID where message is in.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.channel?.id'
        },
        {
            name: 'Message ID',
            description: 'Message ID to get the data from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.message?.id'
        }
    ],
    code: async function(d, [
        payload,
        guildID = d.ctx?.guild?.id,
        channelID = d.ctx?.channel?.id,
        messageID = d.ctx?.message?.id
    ]) {
        if (payload === undefined) throw new d.error(d, 'required', 'Message Payload', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)
        if (channelID === undefined) throw new d.error(d, 'invalid', 'Channel ID', d.function?.name!)
        if (messageID === undefined) throw new d.error(d, 'invalid', 'Message ID', d.function?.name!)

        const guild = await d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const channel = await d.util.getChannel<GuildTextBasedChannel>(channelID, guild)
        if (!channel) throw new d.error(d, 'invalid', 'Channel ID', d.function?.name!)

        const message = await d.util.getMessage(channel, messageID)
        if (!message) throw new d.error(d, 'invalid', 'Message ID', d.function?.name!)
        
        const container = new Container;

        const result = await d.reader.compile(payload, d)
        if (result?.code) container.pushContent(result.code)

        const data = await message.edit(container).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 4 }))
        })
    }
})