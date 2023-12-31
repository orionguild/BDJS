import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { Sticker } from 'discord.js'

export default new BaseEvent<[Sticker]>({
    name: 'onStickerCreate',
    description: 'Executed when an sticker is created.',
    async listener(bot, sticker) {
        const context = new Context({
            author: sticker.user,
            guild: sticker.guild,
            raw: sticker
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'stickerCreate')
        const data = new Data({
            bot, ctx: context,
            commandType: 'stickerCreate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})
