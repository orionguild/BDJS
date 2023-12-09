import { ChatInputCommandInteraction } from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check whether current interaction belongs to a slash command or not.',
    code: async function(d) {
        if (d.commandType !== 'anyInteraction') return d.logs.error(
            'Disallowed function: $isCommand must be used in "anyInteraction" commands!'
        )
        return d.ctx?.data instanceof ChatInputCommandInteraction
    }
})