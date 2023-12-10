import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Edits a defer reply.',
    parameters: [
        {
            name: 'Message',
            description: 'The message payload.',
            required: true,
            compile: false,
            value: 'none'
        }
    ],
    code: async function(d, [message]) {
        if (!(d.ctx?.data instanceof BaseInteraction)) throw new d.error(d, 'disallowed', d.function?.name!, 'interactions')
        if (!d.ctx.data.isRepliable()) throw new d.error(d, 'custom', `${d.commandType} is not repliable.`)
        if (!d.ctx.data.deferred) throw new d.error(d, 'custom', 'Cannot edit an interaction that is not deferred.')

        const result = await d.reader.compile(message, d)
        if (result?.code) d.container.pushContent(result.code)

        const data = await d.ctx.data.editReply(d.container).then((res) => {
            d.container.clear()
            return res
        }).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 4 }))
        })
    }
})
