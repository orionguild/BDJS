"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Execute a code for each array element.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Variable',
            description: 'Variable to load the results to.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Code',
            description: 'Code to be applied to each element.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Separator',
            description: 'Result separator.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function (d, [name, variable, code, separator = ',']) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Array Name', d.function?.name);
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function?.name);
        if (code === undefined)
            throw new d.error(d, 'required', 'Code', d.function?.name);
        const args = d.getEnvironmentVariable(name);
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args))
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name);
        const results = [];
        for (const element of args) {
            const data = d.extend(d);
            data.setEnvironmentVariable('element', element);
            const compiled = await data.reader.compile(code, data);
            if (compiled.code !== '')
                results.push(compiled.code);
        }
        d.setEnvironmentVariable(variable, results.join(separator));
    }
});
