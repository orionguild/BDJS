"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const undici_1 = require("undici");
exports.default = new Function_1.BaseFunction({
    description: 'Performs an http DELETE request to given url.',
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
            name: 'Response Type',
            description: 'The type of response API can return. (json\|text\|blob\|arrayBuffer)',
            required: false,
            resolver: 'String',
            value: 'json'
        },
        {
            name: 'Headers',
            description: 'Headers to include to the request data.',
            required: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [url, variable, responseType = 'json', ...raw_headers]) {
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
            method: 'DELETE'
        });
        const data = responseType === 'json' ? await result.body.json()
            : responseType === 'arrayBuffer' ? await result.body.arrayBuffer()
                : responseType === 'blob' ? await result.body.blob()
                    : await result.body.text();
        d.setEnvironmentVariable(variable, {
            body: data,
            code: result.statusCode,
            headers: result.headers
        });
    }
});
