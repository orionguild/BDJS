import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { Sticker } from 'discord.js'

export default new BaseEvent<[Sticker, Sticker]>({
    name: 'onStickerUpdate',
    description: 'Executed when an sticker is updated.',
    async listener(bot, old, sticker) {
        const context = new Context({
            author: sticker.user,
            guild: sticker.guild,
            raw: sticker
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'stickerUpdate')
        const data = new Data({
            bot, ctx: context,
            env: {
                '__BDJS__OLD__STICKER__': old,
                '__BDJS__NEW__STICKER__': sticker
            },
            commandType: 'stickerUpdate',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})