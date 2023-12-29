"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Sends a message to the provided channel.',
    parameters: [
        {
            name: 'Payload',
            description: 'Message payload.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Channel ID',
            description: 'The ID of the channel were the message will be sent.',
            required: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild were the channel is located.',
            required: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Return ID',
            description: 'Whether return the message ID.',
            required: false,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function (d, [payload, channelID = d.ctx?.channel?.isTextBased() ? d.ctx.channel.id : undefined, guildID = d.ctx?.guild?.id, returnID = 'false']) {
        if (payload === undefined)
            throw new d.error(d, 'required', 'Message Payload', d.function?.name);
        if (guildID === undefined)
            throw new d.error(d, 'invalid', 'Guild ID', d.function?.name);
        if (channelID === undefined)
            throw new d.error(d, 'invalid', 'Channel ID', d.function?.name);
        const guild = d.bot?.guilds.cache.get(guildID);
        if (!guild)
            throw new d.error(d, 'invalid', 'Guild', d.function?.name);
        const channel = await d.util.getChannel(channelID, guild);
        if (!channel || channel && !channel.isTextBased())
            throw new d.error(d, 'invalid', 'Channel', d.function?.name);
        const compiled = await d.reader.compile(payload, d);
        if (compiled.code)
            d.container.pushContent(compiled.code);
        channel.send(d.container).then((message) => {
            d.container.clear();
            if (returnID === 'true')
                return message.id;
        }).catch((e) => {
            d.container.clear();
            throw new d.error(d, 'custom', (0, util_1.inspect)(e, { depth: 2 }));
        });
    }
});
