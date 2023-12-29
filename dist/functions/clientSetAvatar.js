"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Set the avatar for the client.',
    parameters: [
        {
            name: 'URL',
            description: 'URL of the new avatar.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [url]) {
        if (url === undefined)
            throw new d.error(d, 'required', 'URL', d.function?.name);
        await d.bot?.user.setAvatar(url);
    }
});
