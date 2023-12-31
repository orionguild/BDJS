"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Function_1 = require("../structures/Function");
const Properties_1 = tslib_1.__importDefault(require("../util/Properties"));
exports.default = new Function_1.BaseFunction({
    description: 'Get a guild member property.',
    parameters: [
        {
            name: 'Property',
            description: 'Member property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Member ID',
            description: 'Guild member ID to get the property from.',
            required: true,
            resolver: 'String',
            value: 'd.ctx?.author?.id'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild where member should be retrieved.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function (d, [property, memberID = d.ctx?.author?.id, guildID = d.ctx?.guild?.id]) {
        if (property === undefined)
            throw new d.error(d, 'required', 'Property Name', d.function?.name);
        if (memberID === undefined)
            throw new d.error(d, 'invalid', 'member ID', d.function?.name);
        if (guildID === undefined)
            throw new d.error(d, 'invalid', 'Guild ID', d.function?.name);
        const guild = d.bot?.guilds.cache.get(guildID);
        if (!guild)
            throw new d.error(d, 'invalid', 'Guild', d.function?.name);
        const member = await guild.members.cache.get(memberID);
        if (!member)
            throw new d.error(d, 'invalid', 'member', d.function?.name);
        const types = Object.keys(Properties_1.default.Member);
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        return Properties_1.default.Member[property.toLowerCase()].code(member);
    }
});
