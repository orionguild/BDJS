"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const promises_1 = require("fs/promises");
exports.default = new Function_1.BaseFunction({
    description: 'Reads a directory and load the result into a environment variable.',
    parameters: [
        {
            name: 'Directory',
            description: 'The directory to be readed.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Variable',
            description: 'Environment variable name to load the code results to, if any.',
            required: true,
            compile: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Separator',
            description: 'Result separator.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function (d, [directory, variable, sep = ',']) {
        if (directory === undefined)
            throw new d.error(d, 'required', 'Directory', d.function?.name);
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function?.name);
        const files = await (0, promises_1.readdir)(directory);
        if (files.length === 0)
            throw new d.error(d, 'custom', `${directory} is empty.`);
        d.setEnvironmentVariable(variable, files.join(sep));
    }
});
