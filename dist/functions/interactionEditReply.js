"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const discord_js_1 = require("discord.js");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Edits a defer reply.',
    parameters: [
        {
            name: 'Message',
            description: 'The message payload.',
            required: true,
            compile: false,
            value: 'none'
        }
    ],
    code: async function (d, [message]) {
        if (!(d.ctx?.raw instanceof discord_js_1.BaseInteraction))
            throw new d.error(d, 'disallowed', d.function?.name, 'interactions');
        if (!d.ctx?.raw.isRepliable())
            throw new d.error(d, 'custom', `${d.commandType} is not repliable.`);
        if (!d.ctx?.raw.deferred)
            throw new d.error(d, 'custom', 'Cannot edit an interaction that is not deferred.');
        const result = await d.reader.compile(message, d);
        if (result?.code)
            d.container.pushContent(result.code);
        const data = await d.ctx?.raw.editReply(d.container).catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e, { depth: 4 }));
        });
        d.container.clear();
    }
});
