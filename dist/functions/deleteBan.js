"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Deletes a ban for the provided user ID in a guild.',
    parameters: [
        {
            name: 'User ID',
            description: 'The user ID to be unbanned.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The Guild ID where the user will be banned from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        },
        {
            name: 'Reason',
            description: 'The reason for deleting the ban.',
            required: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [userID, guildID = d.ctx?.guild?.id, reason]) {
        if (userID === undefined)
            throw new d.error(d, 'required', 'name', d.function?.name);
        if (guildID === undefined)
            throw new d.error(d, 'invalid', 'guild ID', d.function?.name);
        const guild = d.bot?.guilds.cache.get(guildID);
        if (!guild)
            throw new d.error(d, 'invalid', 'guild ID', d.function?.name);
        const user = d.bot?.users.cache.get(userID) || await d.bot?.users.fetch(userID);
        if (!user)
            throw new d.error(d, 'invalid', 'user ID', d.function?.name);
        const ban = guild.bans.cache.find(ban => ban.user.id === userID);
        if (!ban)
            throw new d.error(d, 'custom', `Cannot find a ban against "${userID}"`);
        await guild.bans.remove(user, reason).catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e));
        });
    }
});
