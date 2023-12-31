import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { AnyThreadChannel } from 'discord.js'
import { Data } from '../structures/Data'

export default new BaseEvent<[AnyThreadChannel, boolean]>({
    name: 'onThreadCreate',
    description: 'Executed when a thread is created.',
    async listener(bot, thread, newlyCreated) {
        const context = new Context({
            guild: thread.guild,
            raw: thread
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'threadCreate')
        const data = new Data({
            bot, context, env: { newlyCreated },
            commandType: 'threadCreate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})
