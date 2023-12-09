import { BaseFunction } from '../structures/Function'
import { ModalSubmitInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Check whether current interaction belongs to a modal or not.',
    code: async function(d) {
        if (d.commandType !== 'anyInteraction') return d.logs.error(
            'Disallowed function: $isModal must be used in "anyInteraction" commands!'
        )
        return d.ctx?.data instanceof ModalSubmitInteraction
    }
})