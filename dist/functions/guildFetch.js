"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildProperty = void 0;
const Function_1 = require("../structures/Function");
function getGuildProperty(guild, property) {
    const data = JSON.parse(JSON.stringify(guild));
    let result;
    return Array.isArray(data[property])
        ? data[property].join(',')
        : typeof data[property] === 'number'
            ? data[property].toString() : data[property];
}
exports.getGuildProperty = getGuildProperty;
exports.default = new Function_1.BaseFunction({
    description: 'Fetch a guild property.',
    parameters: [
        {
            name: 'Property',
            description: 'Guild property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'Guild ID to fetch the property from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function (d, [property, guildID = d.ctx?.guild?.id]) {
        if (property === undefined)
            throw new d.error(d, 'required', 'Property Name', d.function?.name);
        if (guildID === undefined)
            throw new d.error(d, 'invalid', 'Guild ID', d.function?.name);
        if (property.toLowerCase() === 'exists')
            return d.bot?.guilds.cache.has(guildID);
        const guild = await d.bot?.guilds.fetch(guildID);
        if (!guild && property === 'exists')
            return 'false';
        else if (!guild && property !== 'exists')
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        const types = Object.keys(JSON.parse(JSON.stringify(guild)));
        if (!types.includes(property))
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        return getGuildProperty(guild, property);
    }
});
