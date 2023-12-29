"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Get a guild role property.',
    parameters: [
        {
            name: 'Property',
            description: 'Role property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Role ID',
            description: 'Guild role ID to get the property from.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild where role should be retrieved.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function (d, [property, roleID, guildID = d.ctx?.guild?.id]) {
        if (property === undefined)
            throw new d.error(d, 'required', 'Property Name', d.function?.name);
        if (roleID === undefined)
            throw new d.error(d, 'invalid', 'Role ID', d.function?.name);
        if (guildID === undefined)
            throw new d.error(d, 'invalid', 'Guild ID', d.function?.name);
        const guild = d.bot?.guilds.cache.get(guildID);
        if (!guild)
            throw new d.error(d, 'invalid', 'Guild', d.function?.name);
        const role = await guild.roles.cache.get(roleID);
        if (!role)
            throw new d.error(d, 'invalid', 'Role', d.function?.name);
        const types = Object.keys(JSON.parse(JSON.stringify(role)));
        if (!types.includes(property))
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        return typeof role[property] === 'string' ? role[property] : typeof role[property] === 'number' ? role[property].toString() : (0, util_1.inspect)(role[property]);
    }
});
