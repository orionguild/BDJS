import { Message, MessageReaction, PartialMessageReaction, User } from 'discord.js'
import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'

export default new BaseEvent<[MessageReaction | PartialMessageReaction, User]>({
    name: 'onMessageReactionAdd',
    description: 'Executed when a message reaction is added.',
    async listener(bot, reaction, user) {
        const context = new Context({
            author: user,
            message: reaction.message as Message,
            raw: reaction
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'reactionAdd')
        const data = new Data({
            bot, context,
            env: {
                '__BDJS__ARGS__': reaction.message.content?.split(/ +/g)
            },
            commandType: 'reactionAdd',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})