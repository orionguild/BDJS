"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const undici_1 = require("undici");
exports.default = new Function_1.BaseFunction({
    description: 'Performs an http GET request to given url.',
    parameters: [
        {
            name: 'URL',
            description: 'URL to request to.',
            required: true,
            resolver: 'String',
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
    code: async function (d, [url, variable, ...raw_headers]) {
        if (url === undefined)
            throw new d.error(d, 'required', 'URL', d.function.name);
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function.name);
        let headers = {};
        if (raw_headers.length) {
            for (const header of raw_headers) {
                const [name, value] = header.split(':');
                headers[name] = value;
            }
        }
        const result = await (0, undici_1.request)(url, {
            headers: raw_headers.length ? headers : undefined,
            method: 'GET'
        });
        d.setEnvironmentVariable(variable, {
            body: await result.body.text(),
            code: result.statusCode,
            headers: result.headers
        });
    }
});
