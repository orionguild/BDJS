import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { GuildBan } from 'discord.js'

export default new BaseEvent<[GuildBan]>({
    name: 'onGuildBanRemove',
    description: 'Executed when a guild ban is removed.',
    async listener(bot, ban) {
        const context = new Context({
            author: ban.user,
            guild: ban.guild,
            raw: ban
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'banRemove')
        const data = new Data({
            bot, context,
            env: {
                'reason': ban.reason
            },
            commandType: 'banRemove',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})