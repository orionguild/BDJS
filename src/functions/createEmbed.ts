import { BaseFunction } from '../structures/Function'
import { EmbedBuilder } from 'discord.js'

export default new BaseFunction({
    description: 'Creates an embed.',
    parameters: [
        {
            name: 'Payload',
            description: 'The embed payload.',
            required: true,
            compile: false,
            value: 'none'
        }
    ],
    code: async function(d, [payload]) {
        if (payload === undefined) throw new d.error(d, 'required', 'payload', d.function?.name!)

        const parentProperties = { ...d }
        const data = d.extend(parentProperties), embed = new EmbedBuilder
        data.functions.set('settitle', new BaseFunction({
            description: 'Set the title for the embed.',
            async code(extended, [title]) {
                if (title === undefined) throw new extended.error(d, 'required', 'title', extended.function?.name!)
                embed.setTitle(title)
            }
        })).set('setdescription', new BaseFunction({
            description: 'Set the description for the embed.',
            async code(extended, [text]) {
                if (text === undefined) throw new extended.error(d, 'required', 'description', extended.function?.name!)
                embed.setDescription(text)
            }
        })).set('setthumbnail', new BaseFunction({
            description: 'Set a thumbnail for the embed.',
            async code(extended, [url]) {
                if (url === undefined) throw new extended.error(d, 'required', 'image URL', extended.function?.name!)
                embed.setThumbnail(url)
            }
        })).set('setfooter', new BaseFunction({
            description: 'Set the footer for the embed.',
            async code(extended, [text, icon]) {
                if (text === undefined) throw new extended.error(d, 'required', 'footer text', extended.function?.name!)
                embed.setFooter({
                    text, iconURL: icon ? icon : undefined
                })
            }
        })).set('setauthor', new BaseFunction({
            description: 'Set the author for the embed.',
            async code(extended, [text, icon]) {
                if (text === undefined) throw new extended.error(d, 'required', 'author name', extended.function?.name!)
                embed.setAuthor({
                    name: text,
                    iconURL: icon ? icon : undefined
                })
            }
        })).set('setcolor', new BaseFunction({
            description: 'Set the footer for the embed.',
            async code(extended, [hex]) {
                if (hex === undefined) throw new extended.error(d, 'required', 'hex code', extended.function?.name!)
                if (!hex.match(/([A-F0-9]{3}|[A-F0-9]{6})/))
                    throw new extended.error(extended, 'invalid', 'hex code', extended.function?.name!)
                embed.setColor(parseInt(hex.replace('#', ''), 16))
            }
        })).set('pushfield', new BaseFunction({
            description: 'Push a field into the embed.',
            async code(extended, [name, value, inline = 'false']) {
                if (name === undefined) throw new extended.error(d, 'required', 'field name', extended.function?.name!)
                if (value === undefined) throw new extended.error(d, 'required', 'field value', extended.function?.name!)
                embed.addFields({
                    name, value, inline: inline === 'true'
                })
            }
        }));

        const injections = Object.values(data.functions.injections).filter(func => func.target === 'createembed')
        for (const inject of injections) {
            data.functions.set(inject.name, inject.data)
        }

        const result = await data.reader.compile(payload, data)

        d.container.addEmbed(embed.toJSON())
        if (result?.code) d.container.pushContent(result.code)
    }
})