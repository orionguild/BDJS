import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { Message } from 'discord.js'

export default new BaseEvent<[Message]>({
    name: 'onMessageDelete',
    description: 'Executed when a message is deleted.',
    async listener(bot, message) {
        const context = new Context({
            author: message.author,
            channel: message.channel,
            guild: message.guild,
            member: message.member,
            message,
            raw: message
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'messageDelete')
        const data = new Data({
            bot, context,
            env: {
                '__BDJS__ARGS__': message.content.split(/ +/g)
            },
            commandType: 'messageDelete',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})