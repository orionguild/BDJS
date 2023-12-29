"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Function_1 = require("../structures/Function");
const ms_1 = tslib_1.__importDefault(require("ms"));
exports.default = new Function_1.BaseFunction({
    description: 'Holds code execution for the given time.',
    parameters: [
        {
            name: 'Duration',
            description: 'The time to hold the remaining code.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [duration]) {
        if (duration === undefined)
            throw new d.error(d, 'required', 'Duration', d.function?.name);
        let parsedDuration = (0, ms_1.default)(duration);
        if (isNaN(parsedDuration))
            throw new d.error(d, 'invalid', 'Duration', d.function?.name);
        await d.util.sleep(parsedDuration);
    }
});
