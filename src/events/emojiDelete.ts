import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { GuildEmoji } from 'discord.js'

export default new BaseEvent<[GuildEmoji]>({
    name: 'onEmojiDelete',
    description: 'Executed when an emoji is deleted.',
    async listener(bot, emoji) {
        const context = new Context({
            author: emoji.author,
            guild: emoji.guild,
            raw: emoji
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'emojiDelete')
        const data = new Data({
            bot, ctx: context,
            commandType: 'emojiDelete',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})
