import { BaseFunction } from '../structures/Function'
import { writeFile } from 'fs/promises'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Writes and replaces any content in a file.',
    parameters: [
        {
            name: 'Directory',
            description: 'The file directory.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Content',
            description: 'File content to replace with.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Encoding',
            description: 'Type of encoding to write into the file.',
            required: false,
            resolver: 'String',
            value: 'utf-8'
        }
    ],
    code: async function(d, [directory, content, encoding = 'utf-8']) {
        if (directory === undefined) throw new d.error(d, 'required', 'Directory', d.function?.name!)
        if (content === undefined) throw new d.error(d, 'required', 'Content', d.function?.name!)

        await writeFile(directory, content, {
            encoding: encoding as BufferEncoding
        }).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 1 }))
        })

    }
})