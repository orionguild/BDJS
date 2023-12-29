"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Removes a role from a guild member.',
    parameters: [
        {
            name: 'Role ID',
            description: 'The ID of the role to be removed.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Member ID',
            description: 'The ID of the member to remove the role from.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The ID of guild were the role belongs to.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function (d, [roleID, memberID, guildID = d.ctx?.guild?.id]) {
        if (roleID === undefined)
            throw new d.error(d, 'required', 'Role ID', d.function?.name);
        if (memberID === undefined)
            throw new d.error(d, 'required', 'Member ID', d.function?.name);
        if (guildID === undefined)
            throw new d.error(d, 'invalid', 'Guild ID', d.function?.name);
        const guild = d.bot?.guilds.cache.get(guildID);
        if (!guild)
            throw new d.error(d, 'invalid', 'Guild ID', d.function?.name);
        const member = await d.util.getMember(memberID, guild);
        if (!member)
            throw new d.error(d, 'invalid', 'Member ID', d.function?.name);
        const role = await d.util.getRole(roleID, guild);
        if (!role)
            throw new d.error(d, 'invalid', 'Role ID', d.function?.name);
        await member.roles.remove(role).catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e));
        });
    }
});
