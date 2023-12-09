import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Follow up an interaction reply.',
    parameters: [
        {
            name: 'Message',
            description: 'The message to be sent.',
            required: true,
            compile: false,
            value: 'none'
        },
        {
            name: 'Ephemeral',
            description: 'Set the reply as ephemeral or not.',
            required: false,
            resolver: 'Boolean',
            value: 'none'
        },
        {
            name: 'Return ID',
            description: 'Returns the interaction reply ID.',
            required: false,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function(d, [message, ephemeral = 'false', returnId = 'false']) {
        if (!(d.ctx?.data instanceof BaseInteraction)) return d.logs.error(
            'Disallowed function: $interactionReply just can be used inside interactions.'
        )
        if (!d.ctx.data.isRepliable()) return d.logs.error(
            d.commandType + ' is not repliable.'
        )
        if (!d.ctx.data.replied) return d.logs.error(
            'Cannot follow up an interaction that is not replied.'
        )

        const result = await d.reader.compile(message, d)
        if (result?.code) d.container.pushContent(result.code)

        if (ephemeral === 'true') (d.container as any).ephemeral = true

        const data = await d.ctx.data.followUp(d.container).then((res) => {
            d.container.clear()
            return res
        }).catch(e => {
            d.logs.error(JSON.stringify(e, null, 4))
        })

        if (data && data.id && returnId === 'true') return data.id
    }
})
