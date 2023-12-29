"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelProperty = void 0;
const Function_1 = require("../structures/Function");
function getChannelProperty(guild, property) {
    const data = JSON.parse(JSON.stringify(guild));
    let result;
    return Array.isArray(data[property]) ? data[property].join(',') : typeof data[property] === 'number' ? data[property].toString() : data[property];
}
exports.getChannelProperty = getChannelProperty;
exports.default = new Function_1.BaseFunction({
    description: 'Get a channel property.',
    parameters: [
        {
            name: 'Property',
            description: 'Channel property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Channel ID',
            description: 'Channel ID to get the property from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.channel?.id'
        },
        {
            name: 'Guild ID',
            description: 'Guild ID to get the property from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function (d, [property, channelID = d.ctx?.channel?.id, guildID = d.ctx?.guild?.id]) {
        if (property === undefined)
            throw new d.error(d, 'required', 'Property Name', d.function?.name);
        if (channelID === undefined)
            throw new d.error(d, 'invalid', 'Channel ID', d.function?.name);
        if (guildID === undefined)
            throw new d.error(d, 'invalid', 'Guild ID', d.function?.name);
        const guild = d.bot?.guilds.cache.get(guildID);
        if (!guild)
            throw new d.error(d, 'invalid', 'Guild', d.function?.name);
        const channel = await d.util.getChannel(channelID, guild);
        if (!channel && property === 'exists')
            return false;
        else if (!channel && property !== 'exists')
            throw new d.error(d, 'invalid', 'Channel ID', d.function?.name);
        const types = Object.keys(JSON.parse(JSON.stringify(channel)));
        if (!types.includes(property))
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        return getChannelProperty(channel, property);
    }
});
