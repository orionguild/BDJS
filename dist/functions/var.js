"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Add a new variable into the environment data.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Value',
            description: 'Variable value.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [name, value]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'name', d.function?.name);
        if (value === undefined)
            throw new d.error(d, 'required', 'value', d.function?.name);
        d.setEnvironmentVariable(name, value);
    }
});
