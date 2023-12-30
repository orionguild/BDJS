import { Message, MessageComponentInteraction } from 'discord.js'
import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Updates an interaction.',
    parameters: [
        {
            name: 'Message',
            description: 'The message to be sent.',
            required: true,
            compile: false,
            value: 'none'
        },
        {
            name: 'Fetch Reply',
            description: 'Whether fetch message reply.',
            required: false,
            resolver: 'Boolean',
            value: 'true'
        },
        {
            name: 'Return ID',
            description: 'Returns the interaction reply ID.',
            required: false,
            compile: true,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function(d, [message, fetchReply = 'true', returnId = 'false']) {
        if (!(d.ctx?.raw instanceof MessageComponentInteraction)) throw new d.error(d, 'disallowed', d.function?.name!, 'component interactions')
        if (!d.ctx?.raw.isRepliable()) throw new d.error(d, 'custom', `${d.commandType} is not repliable.`)
        if (!d.ctx?.raw.replied) throw new d.error(d, 'custom', 'Cannot update an interaction that is not replied.')

        const result = await d.reader.compile(message, d)
        if (result?.code) d.container.pushContent(result.code)

        d.container.setFetchReply(fetchReply === 'true')

        const data = await d.ctx?.raw.update(d.container).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 4 }))
        })

        d.container.clear()

        if (data instanceof Message && returnId === 'true')
            return data.id
    }
})
