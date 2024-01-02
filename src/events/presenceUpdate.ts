import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { Presence } from 'discord.js'

export default new BaseEvent<[Presence | null, Presence]>({
    name: 'onPresenceUpdate',
    description: 'Executed when a presence is updated.',
    async listener(bot, old, presence) {
        const context = new Context({
            author: presence.user,
            guild: presence.guild,
            member: presence.member,
            raw: presence
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'presenceUpdate')
        const data = new Data({
            bot, ctx: context,
            env: {
                '__BDJS__OLD__PRESENCE__': old?.activities[0],
                '__BDJS__NEW__PRESENCE__': presence.activities[0],
            },
            commandType: 'emojiUpdate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})
