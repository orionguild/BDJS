import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import { GuildEmoji } from 'discord.js'

export default new BaseFunction({
    description: 'Get information from a new emoji.',
    parameters: [
        {
            name: 'Property',
            description: 'The property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [property]) {
        if (d.commandType !== 'emojiUpdate')
            throw new d.error(d, 'disallowed', d.function!.name, 'onEmojiUpdate event')
        if (property === undefined)
            throw new d.error(d, 'required', 'Property', d.function!.name)

        const types = Object.keys(Properties.Emoji)
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function!.name)

        const sticker = d.getEnvironmentVariable('__BDJS__NEW__EMOJI__') as GuildEmoji

        return Properties.Emoji[property.toLowerCase()].code(sticker)
    }
})
