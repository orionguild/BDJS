import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Check whether interaction is repliable or not.',
    code: async function(d) {
        if (!(d.ctx?.data instanceof BaseInteraction)) return d.logs.error(
            'Disallowed function: $interactionIsRepliable just can be used inside interactions.'
        )
        return d.ctx.data.isRepliable()
    }
})
