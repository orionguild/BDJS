"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Prints a text into the console.',
    parameters: [
        {
            name: 'Texts',
            description: 'The text to print into the console.',
            required: true,
            resolver: 'String',
            compile: true,
            value: 'none'
        }
    ],
    code: async function (d, [text]) {
        if (text === undefined)
            throw new d.error(d, 'required', 'Texts', d.function?.name);
        console.log(text);
    }
});
