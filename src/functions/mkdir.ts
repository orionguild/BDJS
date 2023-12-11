import { BaseFunction } from '../structures/Function'
import { mkdir } from 'fs/promises'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Makes a directory.',
    parameters: [
        {
            name: 'Directory',
            description: 'The directory to be created.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [directory]) {
        if (directory === undefined) throw new d.error(d, 'required', 'Directory', d.function?.name!)

        await mkdir(directory).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 1 }))
        })

    }
})