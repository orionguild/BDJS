"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Returns the length of a text.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [text]) {
        if (text === undefined)
            throw new d.error(d, 'required', 'Text', d.function.name);
        return text.length;
    }
});
