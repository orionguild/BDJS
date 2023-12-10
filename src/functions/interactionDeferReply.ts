import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'
import { inspect } from 'util'

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
        if (!(d.ctx?.data instanceof BaseInteraction))
            throw new d.error(d, 'disallowed', d.function?.name!, 'interactions')
        if (!d.ctx.data.isRepliable()) throw new d.error(d, 'custom', `${d.commandType} is not repliable.`)
        if (d.ctx.data.deferred) throw new d.error(d, 'custom', 'Cannot defer an interaction that is already deferred.')

        const data = await d.ctx.data.deferReply({ ephemeral: ephemeral === 'true' }).then((res) => {
            return res
        }).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 4 }))
        })

        if (data && data.id && returnId === 'true') return data.id
    }
})
