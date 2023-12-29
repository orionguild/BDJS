"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Client leaves the provided guild.',
    parameters: [
        {
            name: 'Guild ID',
            description: 'Guild ID which the client will leave.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [guildID = d.ctx?.guild?.id]) {
        if (guildID === undefined)
            throw new d.error(d, 'invalid', 'guildID', d.function?.name);
        const guild = d.bot?.guilds.cache.get(guildID);
        if (!guild)
            throw new d.error(d, 'invalid', 'Guild', d.function?.name);
        await guild.leave().catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e));
        });
    }
});
