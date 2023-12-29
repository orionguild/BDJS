"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const guildFetch_1 = require("./guildFetch");
exports.default = new Function_1.BaseFunction({
    description: 'Get a guild property.',
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
            description: 'Guild ID to get the property from.',
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
        const guild = d.bot?.guilds.cache.get(guildID);
        if (!guild)
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        const types = Object.keys(JSON.parse(JSON.stringify(guild)));
        if (!types.includes(property))
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        return (0, guildFetch_1.getGuildProperty)(guild, property);
    }
});
