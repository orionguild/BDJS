import { BaseFunction } from '../structures/Function'
import { request } from 'undici'

export default new BaseFunction({
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
            name: 'Headers',
            description: 'Headers to include to the request data.',
            required: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [url, variable, ...raw_headers]) {
        if (url === undefined)
            throw new d.error(d, 'required', 'URL', d.function!.name)
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function!.name)

        let headers = {} as Record<string, string>
        if (raw_headers.length) {
            for (const header of raw_headers) {
                const [name, value] = header.split(':')
                headers[name] = value
            }
        }

        const result = await request(url, {
            headers: raw_headers.length ? headers : undefined,
            method: 'DELETE'
        })

        d.setEnvironmentVariable(variable, {
            body: await result.body.text(),
            code: result.statusCode,
            headers: result.headers
        })
    }
})