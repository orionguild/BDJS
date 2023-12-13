import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { GuildMember } from 'discord.js'

export default new BaseEvent<[GuildMember]>({
    name: 'onGuildMemberAdd',
    description: 'Executed when a new member joins a guild.',
    async listener(bot, member) {
        const context = new Context(member)
        const commands = bot.commands.filter(cmd => cmd.type === 'memberJoin')
            const data = new Data({
                bot,
                context,
                commandType: 'memberJoin',
                functions: bot.functions,
                instanceTime: new Date,
                reader: bot.reader
            })

            for (const command of commands) {
                data.command = command
                await data.reader.compile(command.code, data)
            }
    }
})