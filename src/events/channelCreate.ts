import { NonThreadGuildBasedChannel } from 'discord.js'
import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'

export default new BaseEvent<[NonThreadGuildBasedChannel]>({
    name: 'onChannelCreate',
    description: 'Executed when a channel is created.',
    async listener(bot, channel) {
        const context = new Context({
            channel,
            guild: channel.guild ?? await bot.guilds.fetch(channel.guildId),
            raw: channel
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'channelCreate')
        const data = new Data({
            bot, ctx: context,
            commandType: 'channelCreate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})