import { ChannelType, DMChannel, NonThreadGuildBasedChannel } from 'discord.js'
import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'

export default new BaseEvent<[NonThreadGuildBasedChannel | DMChannel, NonThreadGuildBasedChannel | DMChannel]>({
    name: 'onChannelUpdate',
    description: 'Executed when a channel is updated.',
    async listener(bot, old_channel, new_channel) {
        if (new_channel.type === ChannelType.DM) return;
        const context = new Context({
            channel: new_channel,
            guild: new_channel.guild,
            raw: new_channel
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'channelUpdate')
        const data = new Data({
            bot, context,
            env: {
                '__BDJS__OLD__CHANNEL': old_channel,
                '__BDJS__NEW__CHANNEL': new_channel
            },
            commandType: 'channelUpdate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})