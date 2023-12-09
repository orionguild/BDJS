import { BaseFunction } from '../structures/Function'
import { ButtonInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Check whether current interaction belongs to a button or not.',
    code: async function(d) {
        if (d.commandType !== 'anyInteraction') return d.logs.error(
            'Disallowed function: $isButton must be used in "anyInteraction" commands!'
        )
        return d.ctx?.data instanceof ButtonInteraction
    }
})