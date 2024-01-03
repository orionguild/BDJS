"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Check whether content is number.',
    parameters: [
        {
            name: 'Number',
            description: 'Number to be tested.',
            required: true,
            value: 'none'
        }
    ],
    code: async function (d, [text]) {
        if (text === undefined)
            throw new d.error(d, 'required', 'Number', d.function.name);
        return !isNaN(Number(text));
    }
});
