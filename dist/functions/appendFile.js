"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const promises_1 = require("fs/promises");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Appends content to the end of a file.',
    parameters: [
        {
            name: 'Directory',
            description: 'The file directory.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Content',
            description: 'File content to append.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Encoding',
            description: 'Type of encoding to write into the file.',
            required: false,
            resolver: 'String',
            value: 'utf-8'
        }
    ],
    code: async function (d, [directory, content, encoding = 'utf-8']) {
        if (directory === undefined)
            throw new d.error(d, 'required', 'Directory', d.function?.name);
        if (content === undefined)
            throw new d.error(d, 'required', 'Content', d.function?.name);
        await (0, promises_1.appendFile)(directory, content, {
            encoding: encoding
        }).catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e, { depth: 1 }));
        });
    }
});
