"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Creates a HyperLink block.',
    parameters: [
        {
            name: 'Text',
            description: 'The text for the block.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'URL',
            description: 'The URL for the block.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [text, url]) {
        if (text === undefined)
            throw new d.error(d, 'required', 'Block Name', d.function.name);
        if (url === undefined)
            throw new d.error(d, 'required', 'Block URL', d.function.name);
        return `[${text}](${url})`;
    }
});
