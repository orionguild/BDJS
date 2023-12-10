import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Check whether interaction is replied or not.',
    code: async function(d) {
        if (!(d.ctx?.data instanceof BaseInteraction)) return d.logs.error(
            'Disallowed function: $interactionIsReplied just can be used inside interactions.'
        )
        return d.ctx.data.isRepliable() && d.ctx.data.replied
    }
})
