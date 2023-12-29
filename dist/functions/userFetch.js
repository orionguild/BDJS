"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProperty = void 0;
const Function_1 = require("../structures/Function");
const util_1 = require("util");
function getUserProperty(user, property) {
    const data = JSON.parse(JSON.stringify(user));
    switch (property) {
        case 'isBot':
            return user.bot + '';
        default:
            return Array.isArray(data[property]) ? data[property].join(',') : typeof user[property] === 'string' ? user[property] : (0, util_1.inspect)(user[property]);
    }
}
exports.getUserProperty = getUserProperty;
exports.default = new Function_1.BaseFunction({
    description: 'Fetch an user property.',
    parameters: [
        {
            name: 'Property',
            description: 'User property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'User ID',
            description: 'User ID to fetch the property from.',
            required: true,
            resolver: 'String',
            value: 'd.ctx?.author?.id'
        }
    ],
    code: async function (d, [property, memberID = d.ctx?.author?.id]) {
        if (property === undefined)
            throw new d.error(d, 'required', 'Property Name', d.function?.name);
        if (memberID === undefined)
            throw new d.error(d, 'invalid', 'User ID', d.function?.name);
        const user = await d.bot?.users.fetch(memberID);
        if (!user)
            throw new d.error(d, 'invalid', 'user', d.function?.name);
        const types = Object.keys(JSON.parse(JSON.stringify(user))).concat(['isBot']);
        if (!types.includes(property))
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        return getUserProperty(user, property);
    }
});
