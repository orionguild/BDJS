"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const promises_1 = require("fs/promises");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Renames a file.',
    parameters: [
        {
            name: 'Old',
            description: 'The old file name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'New',
            description: 'The new file name.',
            required: true,
            compile: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [old, _new]) {
        if (old === undefined)
            throw new d.error(d, 'required', 'Old Name', d.function?.name);
        if (_new === undefined)
            throw new d.error(d, 'required', 'New Name', d.function?.name);
        await (0, promises_1.rename)(old, _new).catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e, { depth: 1 }));
        });
    }
});
