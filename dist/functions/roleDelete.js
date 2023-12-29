"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Deletes a guild role.',
    parameters: [
        {
            name: 'Role ID',
            description: 'Guild role ID to be deleted.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild where role will be deleted from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        },
        {
            name: 'Reason',
            description: 'Reason for role deletion.',
            required: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [roleID, guildID = d.ctx?.guild?.id, reason]) {
        if (roleID === undefined)
            throw new d.error(d, 'invalid', 'Role ID', d.function?.name);
        if (guildID === undefined)
            throw new d.error(d, 'invalid', 'Guild ID', d.function?.name);
        const guild = await d.bot?.guilds.fetch(guildID);
        if (!guild)
            throw new d.error(d, 'invalid', 'Guild', d.function?.name);
        const role = await guild.roles.cache.get(roleID);
        if (!role)
            throw new d.error(d, 'invalid', 'Role', d.function?.name);
        await role.delete(reason).catch((e) => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e));
        });
    }
});
