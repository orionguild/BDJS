import { ChannelType, DMChannel, NonThreadGuildBasedChannel } from 'discord.js'
import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'

export default new BaseEvent<[NonThreadGuildBasedChannel | DMChannel]>({
    name: 'onChannelDelete',
    description: 'Executed when a channel is deleted.',
    async listener(bot, channel) {
        if (channel.type === ChannelType.DM) return;
        const context = new Context({
            channel,
            guild: channel.guild ?? await bot.guilds.fetch(channel.guildId),
            raw: channel
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'channelDelete')
        const data = new Data({
            bot, ctx: context,
            commandType: 'channelDelete',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})