"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const discord_js_1 = require("discord.js");
exports.default = new Function_1.BaseFunction({
    builders: true,
    injectable: true,
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
    code: async function (d, [payload]) {
        if (payload === undefined)
            throw new d.error(d, 'required', 'payload', d.function?.name);
        const data = d.extend(d), embed = new discord_js_1.EmbedBuilder;
        data.functions.set('settitle', new Function_1.BaseFunction({
            description: 'Set the title for the embed.',
            async code(extended, [title]) {
                if (title === undefined)
                    throw new extended.error(d, 'required', 'title', extended.function?.name);
                embed.setTitle(title);
            }
        })).set('setdescription', new Function_1.BaseFunction({
            description: 'Set the description for the embed.',
            async code(extended, [text]) {
                if (text === undefined)
                    throw new extended.error(d, 'required', 'description', extended.function?.name);
                embed.setDescription(text);
            }
        })).set('setthumbnail', new Function_1.BaseFunction({
            description: 'Set a thumbnail for the embed.',
            async code(extended, [url]) {
                if (url === undefined)
                    throw new extended.error(d, 'required', 'image URL', extended.function?.name);
                embed.setThumbnail(url);
            }
        })).set('setimage', new Function_1.BaseFunction({
            description: 'Set an image for the embed.',
            async code(extended, [url]) {
                if (url === undefined)
                    throw new extended.error(d, 'required', 'image URL', extended.function?.name);
                embed.setImage(url);
            }
        })).set('setfooter', new Function_1.BaseFunction({
            description: 'Set the footer for the embed.',
            async code(extended, [text, icon]) {
                if (text === undefined)
                    throw new extended.error(d, 'required', 'footer text', extended.function?.name);
                embed.setFooter({
                    text, iconURL: icon ? icon : undefined
                });
            }
        })).set('setauthor', new Function_1.BaseFunction({
            description: 'Set the author for the embed.',
            async code(extended, [text, icon]) {
                if (text === undefined)
                    throw new extended.error(d, 'required', 'author name', extended.function?.name);
                embed.setAuthor({
                    name: text,
                    iconURL: icon ? icon : undefined
                });
            }
        })).set('setcolor', new Function_1.BaseFunction({
            description: 'Set the footer for the embed.',
            async code(extended, [hex]) {
                if (hex === undefined)
                    throw new extended.error(d, 'required', 'hex code', extended.function?.name);
                if (!hex.match(/([A-F0-9]{3}|[A-F0-9]{6})/))
                    throw new extended.error(extended, 'invalid', 'hex code', extended.function?.name);
                embed.setColor(parseInt(hex.replace('#', ''), 16));
            }
        })).set('pushfield', new Function_1.BaseFunction({
            description: 'Push a field into the embed.',
            async code(extended, [name, value, inline = 'false']) {
                if (name === undefined)
                    throw new extended.error(d, 'required', 'field name', extended.function?.name);
                if (value === undefined)
                    throw new extended.error(d, 'required', 'field value', extended.function?.name);
                embed.addFields({
                    name, value, inline: inline === 'true'
                });
            }
        }));
        const injections = Object.values(data.functions.injections).filter(func => func.target === 'createembed');
        for (const inject of injections) {
            data.functions.set(inject.name, inject.data);
        }
        const result = await data.reader.compile(payload, data);
        d.container.addEmbed(embed.toJSON());
        if (result?.code)
            d.container.pushContent(result.code);
    }
});
