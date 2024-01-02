import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { PartialUser, User } from 'discord.js'

export default new BaseEvent<[User | PartialUser, User]>({
    name: 'onUserUpdate',
    description: 'Executed when an user is updated.',
    async listener(bot, old, user) {
        const context = new Context({
            author: user,
            raw: user
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'userUpdate')
        const data = new Data({
            bot, ctx: context,
            env: {
                '__BDJS__OLD__USER__': old,
                '__BDJS__NEW__USER__': user
            },
            commandType: 'userUpdate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})
