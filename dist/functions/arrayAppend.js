"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Appends an element to the given array.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Elements',
            description: 'Elements to be pushed',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [name, ...elements]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Array Name', d.function?.name);
        if (elements[0] === undefined)
            throw new d.error(d, 'required', 'Elements', d.function?.name);
        const args = d.getEnvironmentVariable(name);
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args))
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name);
        for (const element of elements) {
            args.push(element);
        }
    }
});
