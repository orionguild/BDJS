"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const discord_js_1 = require("discord.js");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Replies an interaction.',
    parameters: [
        {
            name: 'Message',
            description: 'The message to be sent.',
            required: true,
            compile: false,
            value: 'none'
        },
        {
            name: 'Ephemeral',
            description: 'Set the reply as ephemeral or not.',
            required: false,
            resolver: 'Boolean',
            value: 'none'
        },
        {
            name: 'Fetch Reply',
            description: 'Whether fetch message reply.',
            required: false,
            resolver: 'Boolean',
            value: 'true'
        },
        {
            name: 'Return ID',
            description: 'Returns the interaction reply ID.',
            required: false,
            compile: true,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function (d, [message, ephemeral = 'false', fetchReply = 'true', returnId = 'false']) {
        if (!(d.ctx?.raw instanceof discord_js_1.BaseInteraction))
            throw new d.error(d, 'disallowed', d.function?.name, 'interactions');
        if (!d.ctx?.raw.isRepliable())
            throw new d.error(d, 'custom', `${d.commandType} is not repliable.`);
        if (d.ctx?.raw.replied)
            throw new d.error(d, 'custom', 'Cannot reply an interaction that is already replied.');
        d.container.clear();
        const result = await d.reader.compile(message, d);
        if (result?.code)
            d.container.pushContent(result.code);
        d.container.setFetchReply(fetchReply === 'true');
        d.container.setEphemeral(ephemeral === 'true');
        const data = await d.ctx?.raw.reply(d.container).catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e, { depth: 4 }));
        });
        d.container.clear();
        if (data instanceof discord_js_1.Message && returnId === 'true')
            return data.id;
    }
});
