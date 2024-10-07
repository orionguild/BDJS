"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Iterates an array object property, does not return anything.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this object.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Property',
            description: 'The array property.',
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
        }
    ],
    code: async function (d, [name, property, variable, code]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Object Name', d.function.name);
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function.name);
        if (code === undefined)
            throw new d.error(d, 'required', 'Code', d.function.name);
        if (!d.hasEnvironmentVariable(name))
            throw new d.error(d, 'invalid', 'Object Name', d.function.name);
        const object = d.getEnvironmentVariable(name);
        if (typeof object !== 'object')
            throw new d.error(d, 'invalid', 'Object', d.function.name);
        if (!Object.prototype.hasOwnProperty.call(object, property))
            throw new d.error(d, 'invalid', 'Object Property', d.function.name);
        if (!Array.isArray(object[property]))
            throw new d.error(d, 'custom', `"${property}" is not a valid array!`);
        for (const value of object[property]) {
            const data = d.extend(d);
            data.setEnvironmentVariable(variable, JSON.stringify(value));
            await data.reader.compile(code, data);
        }
    }
});
