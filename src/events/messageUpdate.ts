import { GuildMember, Message, PartialGuildMember, PartialMessage } from 'discord.js'
import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'

export default new BaseEvent<[Message | PartialMessage, Message | PartialMessage]>({
    name: 'onGuildMemberUpdate',
    description: 'Executed when a guild member is updated.',
    async listener(bot, old_msg, new_msg) {
        const context = new Context({
            author: new_msg.author,
            guild: new_msg.guild,
            member: new_msg.member,
            raw: new_msg
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'messageUpdate')
        const data = new Data({
            bot, context,
            env: {
                '__BDJS__OLD__MESSAGE__': old_msg,
                '__BDJS__NEW__MESSAGE__': new_msg,
                '__BDJS__ARGS__': new_msg.content?.split(/ +/g)
            },
            commandType: 'messageUpdate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})