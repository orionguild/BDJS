"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Push an object value to an array object.',
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
            description: 'The array property to push the element to.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Value',
            description: 'The object value to be pushed.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [name, property, value]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Object Name', d.function.name);
        if (value === undefined)
            throw new d.error(d, 'required', 'Object Value', d.function.name);
        if (!d.hasEnvironmentVariable(name))
            throw new d.error(d, 'invalid', 'Object Name', d.function.name);
        const object = d.getEnvironmentVariable(name);
        if (typeof object !== 'object')
            throw new d.error(d, 'invalid', 'Object', d.function.name);
        if (!Object.prototype.hasOwnProperty.call(object, property))
            throw new d.error(d, 'invalid', 'Object Property', d.function.name);
        if (!Array.isArray(object[property]))
            throw new d.error(d, 'custom', `"${property}" is not a valid array!`);
        const length = object[property].length;
        object[property].push(JSON.parse(value));
        return String(length !== object[property].length);
    }
});
