"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const discord_js_1 = require("discord.js");
exports.default = new Function_1.BaseFunction({
    description: 'Creates a file data to be sent whintin message payload.',
    parameters: [
        {
            name: 'Name',
            description: 'File name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Content',
            description: 'File content.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [name, content]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'File Name', d.function.name);
        if (content === undefined)
            throw new d.error(d, 'required', 'File Content', d.function.name);
        const file = new discord_js_1.AttachmentBuilder(content, { name });
        d.container.addFile(file);
    }
});
