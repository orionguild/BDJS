"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Function_1 = require("../structures/Function");
const Properties_1 = tslib_1.__importDefault(require("../util/Properties"));
exports.default = new Function_1.BaseFunction({
    description: 'Get a client property.',
    parameters: [
        {
            name: 'Property',
            description: 'Client property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [property]) {
        if (property === undefined)
            throw new d.error(d, 'required', 'Property Name', d.function?.name);
        const types = Object.keys(Properties_1.default.Bot);
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        return Properties_1.default.Bot[property.toLowerCase()].code(d.bot);
    }
});
