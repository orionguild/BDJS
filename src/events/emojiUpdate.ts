import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { GuildEmoji } from 'discord.js'

export default new BaseEvent<[GuildEmoji, GuildEmoji]>({
    name: 'onEmojiUpdate',
    description: 'Executed when an emoji is updated.',
    async listener(bot, old, emoji) {
        const context = new Context({
            author: emoji.author,
            guild: emoji.guild,
            raw: emoji
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'emojiUpdate')
        const data = new Data({
            bot, ctx: context,
            env: {
                '__BDJS__OLD__EMOJI__': old,
                '__BDJS__NEW__EMOJI__': emoji,
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
