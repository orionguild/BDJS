"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Get a variable from the environment data.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [name]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'name', d.function?.name);
        return d.getEnvironmentVariable(name);
    }
});
