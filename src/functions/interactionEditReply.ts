import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

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
        if (!(d.ctx?.data instanceof BaseInteraction)) return d.logs.error(
            'Disallowed function: $interactionReply just can be used inside interactions.'
        )
        if (!d.ctx.data.isRepliable()) return d.logs.error(
            d.commandType + ' is not repliable.'
        )
        if (!d.ctx.data.deferred) return d.logs.error(
            'Cannot edit an interaction that is not deferred.'
        )

        const result = await d.reader.compile(message, d)
        if (result?.code) d.container.pushContent(result.code)

        const data = await d.ctx.data.editReply(d.container).then((res) => {
            d.container.clear()
            return res
        }).catch(e => {
            d.logs.error(JSON.stringify(e, null, 4))
        })
    }
})
