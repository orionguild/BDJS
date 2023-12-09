import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Check whether current interaction belongs to a select menu or not.',
    code: async function(d) {
        if (d.commandType !== 'anyInteraction') return d.logs.error(
            'Disallowed function: $isAnySelectMenu must be used in "anyInteraction" commands!'
        )
        return d.ctx?.data instanceof BaseInteraction && d.ctx.data.isAnySelectMenu()
    }
})