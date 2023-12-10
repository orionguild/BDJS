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
        const parentProperties = { ...d }
        const data = d.extend(parentProperties), embed = new EmbedBuilder
        data.functions.set('settitle', new BaseFunction({
            description: 'Set the title for the embed.',
            async code(extended, [title]) {
                embed.setTitle(title)
            }
        })).set('setdescription', new BaseFunction({
            description: 'Set the description for the embed.',
            async code(extended, [text]) {
                embed.setDescription(text)
            }
        })).set('setthumbnail', new BaseFunction({
            description: 'Set a thumbnail for the embed.',
            async code(extended, [url]) {
                embed.setThumbnail(url)
            }
        })).set('setfooter', new BaseFunction({
            description: 'Set the footer for the embed.',
            async code(extended, [text, icon]) {
                embed.setFooter({
                    text, iconURL: icon ? icon : undefined
                })
            }
        })).set('setauthor', new BaseFunction({
            description: 'Set the author for the embed.',
            async code(extended, [text, icon]) {
                embed.setAuthor({
                    name: text,
                    iconURL: icon ? icon : undefined
                })
            }
        })).set('setcolor', new BaseFunction({
            description: 'Set the footer for the embed.',
            async code(extended, [hex]) {
                if (!hex.match(/([A-F0-9]{3}|[A-F0-9]{6})/)) return extended.logs.error(
                    'Invalid hex code provided in: $setColor'
                )
                embed.setColor(parseInt(hex.replace('#', ''), 16))
            }
        })).set('pushfield', new BaseFunction({
            description: 'Push a field into the embed.',
            async code(extended, [name, value, inline = 'false']) {
                embed.addFields({
                    name, value, inline: inline === 'true'
                })
            }
        }));

        const result = await data.reader.compile(payload, data)

        d.container.addEmbed(embed.toJSON())
        if (result?.code) d.container.pushContent(result.code)
    }
})