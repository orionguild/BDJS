import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { AnyThreadChannel } from 'discord.js'
import { Data } from '../structures/Data'

export default new BaseEvent<[AnyThreadChannel, AnyThreadChannel]>({
    name: 'onThreadUpdate',
    description: 'Executed when a thread is updated.',
    async listener(bot, old, thread) {
        const context = new Context({
            guild: thread.guild,
            raw: thread
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'threadUpdate')
        const data = new Data({
            bot, ctx: context,
            env: {
                '__BDJS__OLD__THREAD__': old,
                '__BDJS__NEW__THREAD__': thread,
            },
            commandType: 'threadUpdate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})
