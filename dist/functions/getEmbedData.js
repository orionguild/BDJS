"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
/**
 * Retrieves a property from an embed.
 * @param property - Property name.
 * @param embed - Embed data.
 */
function getMessageProperty(d, property, embed) {
    switch (property.toLowerCase()) {
        case 'authoricon': return embed.author?.iconURL;
        case 'authorname': return embed.author?.name;
        case 'title': return embed.title;
        case 'description': return embed.description;
        case 'image': return embed.image;
        case 'footertext': return embed.footer?.text;
        case 'footericon': return embed.footer?.iconURL;
        case 'color': return embed.hexColor;
        case 'thumbnail': return embed.thumbnail;
        default:
            throw new d.error(d, 'invalid', 'Embed Property', d.function?.name);
    }
}
exports.default = new Function_1.BaseFunction({
    description: 'Retrieves data from an embed message.',
    parameters: [
        {
            name: 'Property',
            description: 'Embed property to be retrieved.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Index',
            description: 'Embed index.',
            required: false,
            resolver: 'Number',
            value: '1'
        },
        {
            name: 'Message ID',
            description: 'Message ID to get the data from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.message?.id'
        }
    ],
    code: async function (d, [property, index = '1', guildID = d.ctx?.guild?.id, channelID = d.ctx?.channel?.id, messageID = d.ctx?.message?.id]) {
        if (property === undefined)
            throw new d.error(d, 'required', 'Property', d.function?.name);
        if (isNaN(Number(index)) || Number(index) < 0)
            throw new d.error(d, 'invalid', 'Index', d.function?.name);
        if (guildID === undefined)
            throw new d.error(d, 'invalid', 'Guild ID', d.function?.name);
        if (channelID === undefined)
            throw new d.error(d, 'invalid', 'Channel ID', d.function?.name);
        if (messageID === undefined)
            throw new d.error(d, 'invalid', 'Message ID', d.function?.name);
        const guild = await d.bot?.guilds.cache.get(guildID);
        if (!guild)
            throw new d.error(d, 'invalid', 'Guild ID', d.function?.name);
        const channel = await d.util.getChannel(channelID, guild);
        if (!channel)
            throw new d.error(d, 'invalid', 'Channel ID', d.function?.name);
        const message = await d.util.getMessage(channel, messageID);
        if (!message)
            throw new d.error(d, 'invalid', 'Message ID', d.function?.name);
        if (message.embeds.length === 0)
            throw new d.error(d, 'custom', 'Unable to get embeds from message.');
        return getMessageProperty(d, property, message.embeds[Number(index)]);
    }
});
