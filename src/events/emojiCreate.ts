import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { GuildEmoji } from 'discord.js'

export default new BaseEvent<[GuildEmoji]>({
    name: 'onEmojiCreate',
    description: 'Executed when an emoji is created.',
    async listener(bot, emoji) {
        const context = new Context({
            author: emoji.author,
            guild: emoji.guild,
            raw: emoji
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'emojiCreate')
        const data = new Data({
            bot, ctx: context,
            commandType: 'emojiCreate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})
