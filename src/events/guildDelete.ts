import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { Guild } from 'discord.js'

export default new BaseEvent<[Guild]>({
    name: 'onGuildDelete',
    description: 'Executed when bot leaves a guild.',
    async listener(bot, guild) {
        const context = new Context({
            guild,
            raw: guild
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'botLeave')
            const data = new Data({
                bot,
                context,
                commandType: 'botLeave',
                functions: bot.functions,
                reader: bot.reader
            })

            for (const command of commands) {
                data.command = command
                await data.reader.compile(command.code, data)
            }
    }
})