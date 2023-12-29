"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const discord_js_1 = require("discord.js");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Follow up an interaction reply.',
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
            name: 'Return ID',
            description: 'Returns the interaction reply ID.',
            required: false,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function (d, [message, ephemeral = 'false', returnId = 'false']) {
        if (!(d.ctx?.raw instanceof discord_js_1.BaseInteraction))
            throw new d.error(d, 'disallowed', d.function?.name, 'interactions');
        if (!d.ctx?.raw.isRepliable())
            throw new d.error(d, 'custom', `${d.commandType} is not repliable.`);
        if (!d.ctx?.raw.replied)
            throw new d.error(d, 'custom', 'Cannot follow up an interaction that is not replied.');
        const result = await d.reader.compile(message, d);
        if (result?.code)
            d.container.pushContent(result.code);
        if (ephemeral === 'true')
            d.container.ephemeral = true;
        const data = await d.ctx?.raw.followUp(d.container).then((res) => {
            d.container.clear();
            return res;
        }).catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e, { depth: 4 }));
        });
        if (data && data.id && returnId === 'true')
            return data.id;
    }
});
