"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberProperty = void 0;
const Function_1 = require("../structures/Function");
const util_1 = require("util");
function getMemberProperty(member, property) {
    switch (property) {
        case 'isbot':
            return member.user.bot + '';
        case 'isbannable':
            return member.bannable + '';
        case 'ismuted':
            return (member.communicationDisabledUntil instanceof Date) + '';
        case 'username':
            return member.user.username;
        case 'id':
            return member.user.id;
        default:
            return Array.isArray(member[property]) ? member[property].join(',') : typeof member[property] === 'string' ? member[property] : (0, util_1.inspect)(member[property]);
    }
}
exports.getMemberProperty = getMemberProperty;
exports.default = new Function_1.BaseFunction({
    description: 'Fetch a guild member property.',
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
            description: 'Guild member ID to fetch the property from.',
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
        const member = await guild.members.fetch(memberID);
        if (!member)
            throw new d.error(d, 'invalid', 'member', d.function?.name);
        const types = Object.keys(JSON.parse(JSON.stringify(member))).concat(['isBot', 'isBannable', 'isMuted', 'username', 'id']);
        if (!types.includes(property))
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        return getMemberProperty(member, property);
    }
});
