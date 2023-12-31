"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Code inside is ignore.',
    parameters: [
        {
            name: 'Code',
            description: 'The condition to evaluate.',
            required: true,
            resolver: 'String',
            value: 'none',
            compile: false
        }
    ],
    code: async function (d, [inside]) {
        if (inside === undefined)
            throw new d.error(d, 'required', 'Inside', d.function?.name);
    }
});
