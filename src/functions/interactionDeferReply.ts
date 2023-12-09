import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Defers an interaction.',
    parameters: [
        {
            name: 'Ephemeral',
            description: 'Send the defer reply as ephemeral.',
            required: false,
            compile: true,
            resolver: 'Boolean',
            value: 'false'
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
    code: async function(d, [ephemeral = 'false', returnId = 'false']) {
        if (!(d.ctx?.data instanceof BaseInteraction)) return d.logs.error(
            'Disallowed function: $interactionDeferReply just can be used inside interactions.'
        )
        if (!d.ctx.data.isRepliable()) return d.logs.error(
            d.commandType + ' is not repliable.'
        )
        if (d.ctx.data.deferred) return d.logs.error(
            'Cannot defer an interaction that is already deferred.'
        )

        const data = await d.ctx.data.deferReply({ ephemeral: ephemeral === 'true' }).then((res) => {
            return res
        }).catch(e => {
            d.logs.error(JSON.stringify(e, null, 4))
        })

        if (data && data.id && returnId === 'true') return data.id
    }
})
