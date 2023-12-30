import { BaseEvent } from '../structures/Event'
import { Context } from '../structures/Context'
import { Data } from '../structures/Data'
import { Typing } from 'discord.js'

export default new BaseEvent<[Typing]>({
    name: 'onTypingStart',
    description: 'Executed when someone starts typing.',
    async listener(bot, typing) {
        const context = new Context({
            author: typing.user,
            channel: typing.channel,
            guild: typing.inGuild() ? typing.guild : null,
            raw: typing
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'typing')
            const data = new Data({
                bot,
                context,
                commandType: 'typing',
                env: {},
                functions: bot.functions,
                reader: bot.reader
            })

            for (const command of commands) {
                data.command = command
                await data.reader.compile(command.code, data)
            }
    }
})