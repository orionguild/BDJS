import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Returns the customID of the interaction.',
    code: async function(d) {
        if (!(d.ctx?.data instanceof BaseInteraction) && !d.ctx?.data.customID) return d.logs.error(
            'Disallowed function: $interactionCommandID just can be used inside interactions.'
        )
        return d.ctx.data.customID
    }
})
