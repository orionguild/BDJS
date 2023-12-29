"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Creates an array.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Method',
            description: 'Method to sort the array. (alpha\|asc\|desc)',
            required: false,
            resolver: 'String',
            value: 'alpha'
        },
        {
            name: 'Separator',
            description: 'The element separator to split the elements.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function (d, [name, method = 'alpha', separator = ',']) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Array Name', d.function?.name);
        if (method === undefined)
            throw new d.error(d, 'required', 'Method', d.function?.name);
        if (!['alpha', 'asc', 'desc'].includes(method.toLowerCase()))
            throw new d.error(d, 'invalid', 'Method', d.function?.name);
        const args = d.getEnvironmentVariable(name);
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args))
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name);
        method = method.toLowerCase();
        return (method === 'alpha'
            ? args.sort() : method === 'asc'
            ? args.sort((a, b) => b.length - a.length)
            : args.sort((a, b) => a.length - b.length))
            .join(separator);
    }
});
