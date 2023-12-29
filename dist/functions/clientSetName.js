"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Set the name for the client.',
    parameters: [
        {
            name: 'Name',
            description: 'The new name for the client.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [name]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'URL', d.function?.name);
        await d.bot?.user.setUsername(name);
    }
});
