import { GuildTextBasedChannel } from 'discord.js'
import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Adds reactions to a message.',
    parameters: [
        {
            name: 'Reactions',
            description: 'All message reactions, separated by commas.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Message ID',
            description: 'The message ID to add reactions to.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.message?.id'
        },
        {
            name: 'Channel ID',
            description: 'The ID of the channel that the message belongs to.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.channel?.id'
        },
        {
            name: 'Guild ID',
            description: 'The guild ID of the message.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function(d, [
        reactions,
        messageID = d.ctx?.message?.id,
        channelID = d.ctx?.channel?.id,
        guildID = d.ctx?.guild?.id
    ]) {
        if (reactions === undefined) throw new d.error(d, 'required', 'Reactions', d.function?.name!)
        if (messageID === undefined) throw new d.error(d, 'invalid', 'Message ID', d.function?.name!)
        if (channelID === undefined) throw new d.error(d, 'invalid', 'Channel ID', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)
        
        const guild = d.bot?.guilds.cache.get(guildID) ?? await d.bot?.guilds.fetch(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const channel = await d.util.getChannel<GuildTextBasedChannel>(channelID, guild)
        if (!channel) throw new d.error(d, 'invalid', 'Channel ID', d.function?.name!)

        const message = await d.util.getMessage(channel, messageID)
        if (!message) throw new d.error(d, 'invalid', 'Message ID', d.function?.name!)

        for (const reaction of reactions.split(',').map(t => t.trim())) {
            await message.react(reaction).catch(e => {
                throw new d.error(d, 'custom', inspect(e))
            })
            await d.util.sleep(1000)
        }
    }
})