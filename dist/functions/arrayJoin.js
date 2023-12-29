"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Joins an array.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Separator',
            description: 'The element separator to join the elements.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function (d, [name, separator = ',']) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Array Name', d.function?.name);
        const args = d.getEnvironmentVariable(name);
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args))
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name);
        return args.join(separator);
    }
});
