import { MessageComponentInteraction } from 'discord.js'
import { BaseFunction } from '../structures/Function'

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
            name: 'Return ID',
            description: 'Returns the interaction reply ID.',
            required: false,
            compile: true,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function(d, [message, returnId = 'false']) {
        if (!(d.ctx?.data instanceof MessageComponentInteraction)) return d.logs.error(
            'Disallowed function: $interactionUpdate just can be used inside component interactions.'
        )
        if (!d.ctx.data.isRepliable()) return d.logs.error(
            d.commandType + ' is not repliable.'
        )
        if (!d.ctx.data.replied) return d.logs.error(
            'Cannot update an interaction that is not replied.'
        )

        const result = await d.reader.compile(message, d)
        if (result?.code) d.container.pushContent(result.code)

        const data = await d.ctx.data.update(d.container).then((res) => {
            d.container.clear()
            return res
        }).catch(e => {
            d.logs.error(JSON.stringify(e, null, 4))
        })

        if (data && data.id && returnId === 'true') return data.id
    }
})
