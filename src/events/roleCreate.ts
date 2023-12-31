import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { Role } from 'discord.js'

export default new BaseEvent<[Role]>({
    name: 'onRoleCreate',
    description: 'Executed when a role is created.',
    async listener(bot, role) {
        const context = new Context({
            guild: role.guild,
            raw: role
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'roleCreate')
        const data = new Data({
            bot, context,
            commandType: 'roleCreate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})
