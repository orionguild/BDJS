"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Function_1 = require("../structures/Function");
const ms_1 = tslib_1.__importDefault(require("ms"));
exports.default = new Function_1.BaseFunction({
    description: 'Executes a code after certain time.',
    parameters: [
        {
            name: 'Time',
            description: 'The time to execute the code.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Code',
            description: 'The code to be executed.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Variable',
            description: 'Environment variable name to load the code results to, if any.',
            required: true,
            compile: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [duration, code, variable]) {
        if (duration === undefined)
            throw new d.error(d, 'required', 'Duration', d.function?.name);
        if (code === undefined)
            throw new d.error(d, 'required', 'Code', d.function?.name);
        let parsedDuration = (0, ms_1.default)(duration);
        if (isNaN(parsedDuration))
            throw new d.error(d, 'invalid', 'Duration', d.function?.name);
        setInterval(() => {
            d.reader.compile(code, d).then((compiled) => {
                if (compiled.code !== '')
                    d.setEnvironmentVariable(variable, compiled.code), d.bot?.emit('interval', d.env);
            });
        }, (0, ms_1.default)(duration));
    }
});
