"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Returns the character of a text at the provided index.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Index',
            description: 'Argument index.',
            required: true,
            resolver: 'Number',
            value: 'none'
        }
    ],
    code: async function (d, [text, index]) {
        if (text === undefined)
            throw new d.error(d, 'required', 'name', d.function?.name);
        if (isNaN(Number(index)) || Number(index) < 0 || Number(index) > text.length)
            throw new d.error(d, 'invalid', 'Index', d.function?.name);
        return text[Number(index)];
    }
});
