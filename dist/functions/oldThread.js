"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Function_1 = require("../structures/Function");
const Properties_1 = tslib_1.__importDefault(require("../util/Properties"));
exports.default = new Function_1.BaseFunction({
    description: 'Get information from an old thread.',
    parameters: [
        {
            name: 'Property',
            description: 'The property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [property]) {
        if (d.commandType !== 'threadUpdate')
            throw new d.error(d, 'disallowed', d.function.name, 'onThreadUpdate event');
        if (property === undefined)
            throw new d.error(d, 'required', 'Property', d.function.name);
        const types = Object.keys(Properties_1.default.Channel);
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function.name);
        const thread = d.getEnvironmentVariable('__BDJS__OLD__THREAD__');
        return Properties_1.default.Thread[property.toLowerCase()].code(thread);
    }
});
