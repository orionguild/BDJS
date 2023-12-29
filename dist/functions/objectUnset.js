"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Function_1 = require("../structures/Function");
const _ = tslib_1.__importStar(require("lodash"));
exports.default = new Function_1.BaseFunction({
    description: 'Removes an object property.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this object.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Separator',
            description: 'The value separator to join the elements.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function (d, [name, path]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Object Name', d.function?.name);
        if (path === undefined)
            throw new d.error(d, 'required', 'Property Path', d.function?.name);
        if (!d.hasEnvironmentVariable(name))
            throw new d.error(d, 'invalid', 'Object Name', d.function?.name);
        let object = d.getEnvironmentVariable(name);
        if (typeof object !== 'object' || (typeof object === 'object' && !(JSON.stringify(object).startsWith('{')) && !(JSON.stringify(object).endsWith('}'))))
            throw new d.error(d, 'invalid', 'Object', d.function?.name);
        d.setEnvironmentVariable(name, _.omit(object, path));
    }
});
