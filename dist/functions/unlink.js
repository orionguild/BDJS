"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const promises_1 = require("fs/promises");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Deletes a file.',
    parameters: [
        {
            name: 'Directory',
            description: 'The directory to be deleted.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [directory]) {
        if (directory === undefined)
            throw new d.error(d, 'required', 'Directory', d.function?.name);
        await (0, promises_1.unlink)(directory).catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e, { depth: 1 }));
        });
    }
});
