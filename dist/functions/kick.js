"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    builders: true,
    description: 'Kicks an user from the provided guild.',
    parameters: [
        {
            name: 'User ID',
            description: 'The user ID to be kicked.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The Guild ID where the user will be kicked from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        },
        {
            name: 'Reason',
            description: 'Kick reason.',
            required: false,
            compile: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [userID, guildID = d.ctx?.guild?.id, reason]) {
        if (userID === undefined)
            throw new d.error(d, 'required', 'name', d.function?.name);
        const member = await d.util.getMember(userID, d.ctx?.guild);
        if (!member)
            throw new d.error(d, 'invalid', 'member', d.function?.name);
        await member.kick(reason).catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e));
        });
    }
});
