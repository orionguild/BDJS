"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const discord_js_1 = require("discord.js");
exports.default = new Function_1.BaseFunction({
    description: 'Returns the customID of the interaction.',
    code: async function (d) {
        if (!(d.ctx?.raw instanceof discord_js_1.BaseInteraction) && !d.ctx?.raw.customID)
            throw new d.error(d, 'disallowed', d.function?.name, 'component interactions');
        return d.ctx?.raw.customID;
    }
});
