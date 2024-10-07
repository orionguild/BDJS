"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Returns an object value from an array object at the given index.',
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
            name: 'Index',
            description: 'The index of the array property.',
            required: true,
            resolver: 'Number',
            value: 'none'
        }
    ],
    code: async function (d, [name, property, index]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Object Name', d.function?.name);
        if (!d.hasEnvironmentVariable(name))
            throw new d.error(d, 'invalid', 'Object Name', d.function?.name);
        let object = d.getEnvironmentVariable(name);
        if (typeof object !== 'object')
            throw new d.error(d, 'invalid', 'Object', d.function?.name);
        if (!Object.prototype.hasOwnProperty.call(object, property))
            throw new d.error(d, 'invalid', 'Object Property', d.function?.name);
        if (!Array.isArray(object[property]))
            throw new d.error(d, 'custom', `"${property}" is not a valid array!`);
        return JSON.stringify(object[property].at(Number(index)));
    }
});
