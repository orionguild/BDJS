"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Returns the name of the chat input command.',
    code: async function (d) {
        if (!(d.ctx?.raw instanceof discord_js_1.ChatInputCommandInteraction))
            throw new d.error(d, 'disallowed', d.function?.name, 'command interactions');
        return d.ctx?.raw.commandName;
    }
});
