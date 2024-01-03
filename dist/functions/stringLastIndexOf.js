"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Finds the index of the last character matched.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Character',
            description: 'Character to be found.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [text, char]) {
        if (text === undefined)
            throw new d.error(d, 'required', 'Text', d.function.name);
        if (char === undefined)
            throw new d.error(d, 'required', 'Character', d.function.name);
        return text.lastIndexOf(char);
    }
});
