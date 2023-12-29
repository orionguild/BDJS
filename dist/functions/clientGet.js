"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const util_1 = require("util");
/**
 * Retrieves a property from the client.
 * @param d - Data
 * @param property - Client property.
 */
function getClientProperty(d, property) {
    const client = d.bot?.user;
    switch (property) {
        case 'isBot':
            return d.bot?.user.bot + '';
        case 'token':
            return d.bot?.token;
        case 'uptime':
            return d.bot?.uptime.toString();
        case 'channelCount':
            return d.bot?.guilds.cache.map(t => t.channels.cache.size).reduce((a, b) => a + b).toString();
        case 'emojiCount':
            return d.bot?.guilds.cache.map(t => t.emojis.cache.size).reduce((a, b) => a + b).toString();
        case 'guildCount':
            return d.bot?.guilds.cache.size.toString();
        case 'userCount':
            return d.bot?.guilds.cache.map(t => t.memberCount).reduce((a, b) => a + b).toString();
        default:
            return Array.isArray(client[property]) ? client[property].join(',') : typeof client[property] === 'string' ? client[property] : typeof client[property] === 'number' ? client[property].toString() : (0, util_1.inspect)(client[property]);
    }
}
exports.default = new Function_1.BaseFunction({
    description: 'Get a client property.',
    parameters: [
        {
            name: 'Property',
            description: 'Client property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [property]) {
        if (property === undefined)
            throw new d.error(d, 'required', 'Property Name', d.function?.name);
        const types = Object.keys(d.bot?.user).concat(['isBot', 'channelCount', 'emojiCount', 'guildCount', 'token', 'uptime', 'userCount']);
        if (!types.includes(property))
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        return getClientProperty(d, property);
    }
});
