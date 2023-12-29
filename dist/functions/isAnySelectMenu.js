"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const discord_js_1 = require("discord.js");
exports.default = new Function_1.BaseFunction({
    description: 'Check whether current interaction belongs to a select menu or not.',
    code: async function (d) {
        if (d.commandType !== 'anyInteraction')
            throw new d.error(d, 'disallowed', d.function?.name, '"anyInteraction" commands');
        return d.ctx?.raw instanceof discord_js_1.BaseInteraction && d.ctx?.raw.isAnySelectMenu();
    }
});
