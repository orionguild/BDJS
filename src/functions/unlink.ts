import { BaseFunction } from '../structures/Function'
import { unlink } from 'fs/promises'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Deletes a file.',
    parameters: [
        {
            name: 'Directory',
            description: 'The directory to be deleted.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [directory]) {
        if (directory === undefined) throw new d.error(d, 'required', 'Directory', d.function?.name!)

        await unlink(directory).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 1 }))
        })

    }
})