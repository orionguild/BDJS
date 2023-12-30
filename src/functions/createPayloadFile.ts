import { BaseFunction } from '../structures/Function'
import { AttachmentBuilder } from 'discord.js'

export default new BaseFunction({
    description: 'Creates a file data to be sent whintin message payload.',
    parameters: [
        {
            name: 'Name',
            description: 'File name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Content',
            description: 'File content.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name, content]) {
        if (name === undefined) throw new d.error(d, 'required', 'File Name', d.function!.name)
        if (content === undefined) throw new d.error(d, 'required', 'File Content', d.function!.name)

        const file = new AttachmentBuilder(content, { name })
        d.container.addFile(file)
        
    }
})