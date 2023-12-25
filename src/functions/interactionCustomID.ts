import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Returns the customID of the interaction.',
    code: async function(d) {
        if (!(d.ctx?.raw instanceof BaseInteraction) && !d.ctx?.raw.customID)
            throw new d.error(d, 'disallowed', d.function?.name!, 'component interactions')
        return d.ctx?.raw.customID
    }
})
