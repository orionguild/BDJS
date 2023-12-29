"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Converts a string to lowercase.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to convert.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [text]) {
        if (text === undefined)
            throw new d.error(d, 'required', 'name', d.function?.name);
        return text.toLowerCase();
    }
});
