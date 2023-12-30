import { GuildMember, PartialGuildMember } from 'discord.js'
import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'

export default new BaseEvent<[GuildMember | PartialGuildMember]>({
    name: 'onGuildMemberRemove',
    description: 'Executed when a new member joins a guild.',
    async listener(bot, member) {
        const context = new Context({
            author: member.user,
            guild: member.guild,
            member,
            raw: member
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'memberLeave')
            const data = new Data({
                bot,
                context,
                commandType: 'memberLeave',
                functions: bot.functions,
                reader: bot.reader
            })

            for (const command of commands) {
                data.command = command
                await data.reader.compile(command.code, data)
            }
    }
})