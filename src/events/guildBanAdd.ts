import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { GuildBan } from 'discord.js'

export default new BaseEvent<[GuildBan]>({
    name: 'onGuildBanAdd',
    description: 'Executed when a guild ban is created.',
    async listener(bot, ban) {
        const context = new Context({
            author: ban.user,
            guild: ban.guild,
            raw: ban
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'banAdd')
        const data = new Data({
            bot, context,
            env: {
                'reason': ban.reason
            },
            commandType: 'banAdd',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})