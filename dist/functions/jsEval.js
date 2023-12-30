"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Evaluates JavaScript code.',
    parameters: [
        {
            name: 'Return results',
            description: 'Whether return evaluation results.',
            required: true,
            resolver: 'Boolean',
            value: 'none'
        },
        {
            name: 'Code',
            description: 'JavaScript code.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [returnResults = 'false', ...code]) {
        if (returnResults === undefined)
            throw new d.error(d, 'required', 'name', d.function?.name);
        if (code[0] === undefined)
            throw new d.error(d, 'required', 'code', d.function?.name);
        code[0] = code.join(';');
        let result;
        code[0] = (await d.reader.compile(code[0], d)).code;
        try {
            result = await eval(code[0]);
        }
        catch (e) {
            result = e;
        }
        if (returnResults === 'true' && result)
            return typeof result === 'string' ? result
                : typeof result === 'object' ? (0, util_1.inspect)(result, { depth: 4 })
                    : result;
    }
});
