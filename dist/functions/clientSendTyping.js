"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Shows the client as "typing" in the provided channel.',
    parameters: [
        {
            name: 'Channel ID',
            description: 'Guild ID which the client will leave.',
            required: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [channelID = d.ctx?.channel?.id]) {
        if (channelID === undefined)
            throw new d.error(d, 'required', 'Channel ID', d.function?.name);
        const channel = await d.util.getChannel(channelID, d.ctx?.guild);
        if (!channel || channel && !channel.isTextBased())
            throw new d.error(d, 'invalid', 'Channel ID', d.function?.name);
        await channel.sendTyping().catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e));
        });
    }
});
