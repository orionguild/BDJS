import { BaseFunction } from '../structures/Function'
import { request } from 'undici'
import * as _ from 'lodash'

export default new BaseFunction({
    description: 'Performs an http PUT request to given url.',
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
    code: async function(d, [url, body, variable, responseType = 'json', ...raw_headers]) {
        if (url === undefined)
            throw new d.error(d, 'required', 'URL', d.function!.name)
        if (body === undefined)
            throw new d.error(d, 'required', 'JSON', d.function!.name)
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function!.name)
        if (!_.isObject(body))
            throw new d.error(d, 'invalid', 'JSON', d.function!.name)

        let headers = {} as Record<string, string>
        if (raw_headers.length) {
            for (const header of raw_headers) {
                const [name, value] = header.split(':')
                headers[name] = value
            }
        }

        const result = await request(url, {
            body,
            headers: raw_headers.length ? headers : undefined,
            method: 'PUT'
        })

        const data = responseType === 'json' ? await result.body.json()
            : responseType === 'arrayBuffer' ? await result.body.arrayBuffer()
            : responseType === 'blob' ? await result.body.blob()
            : await result.body.text()

        d.setEnvironmentVariable(variable, {
            body: data,
            code: result.statusCode,
            headers: result.headers
        })
    }
})