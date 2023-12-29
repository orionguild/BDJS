"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Function_1 = require("../structures/Function");
const undici_1 = require("undici");
const _ = tslib_1.__importStar(require("lodash"));
exports.default = new Function_1.BaseFunction({
    description: 'Performs an http POST request to given url.',
    parameters: [
        {
            name: 'URL',
            description: 'URL to request to.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'data',
            description: 'Data to send as body.',
            required: true,
            resolver: 'Object',
            value: 'none'
        },
        {
            name: 'Variable',
            description: 'Variable name to load the results to.',
            required: true,
            resolver: 'String',
            compile: false,
            value: 'none'
        },
        {
            name: 'Headers',
            description: 'Headers to include to the request data.',
            required: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [url, body, variable, ...raw_headers]) {
        if (url === undefined)
            throw new d.error(d, 'required', 'URL', d.function.name);
        if (body === undefined)
            throw new d.error(d, 'required', 'JSON', d.function.name);
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function.name);
        if (!_.isObject(body))
            throw new d.error(d, 'invalid', 'JSON', d.function.name);
        let headers = {};
        if (raw_headers.length) {
            for (const header of raw_headers) {
                const [name, value] = header.split(':');
                headers[name] = value;
            }
        }
        const result = await (0, undici_1.request)(url, {
            body,
            headers: raw_headers.length ? headers : undefined,
            method: 'POST'
        });
        d.setEnvironmentVariable(variable, {
            body: await result.body.text(),
            code: result.statusCode,
            headers: result.headers
        });
    }
});
