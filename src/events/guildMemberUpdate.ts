import { GuildMember, PartialGuildMember } from 'discord.js'
import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'

export default new BaseEvent<[GuildMember | PartialGuildMember, GuildMember | PartialGuildMember]>({
    name: 'onGuildMemberUpdate',
    description: 'Executed when a guild member is updated.',
    async listener(bot, old_member, new_member) {
        const context = new Context({
            author: new_member.user,
            guild: new_member.guild,
            member: new_member,
            raw: new_member
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'memberUpdate')
        const data = new Data({
            bot, ctx: context,
            env: {
                '__BDJS__OLD__MEMBER__': old_member,
                '__BDJS__NEW__MEMBER__': new_member
            },
            commandType: 'memberUpdate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})