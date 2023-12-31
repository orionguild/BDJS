import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import { Sticker } from 'discord.js'

export default new BaseFunction({
    description: 'Get information from a new sticker.',
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
        if (d.commandType !== 'stickerUpdate')
            throw new d.error(d, 'disallowed', d.function!.name, 'onStickerUpdate event')
        if (property === undefined)
            throw new d.error(d, 'required', 'Property', d.function!.name)

        const types = Object.keys(Properties.Channel)
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function!.name)

        const sticker = d.getEnvironmentVariable('__BDJS__OLD__STICKER__') as Sticker

        return Properties.Sticker[property.toLowerCase()].code(sticker)
    }
})