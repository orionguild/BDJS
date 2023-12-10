import { ChatInputCommandInteraction, MessageComponentInteraction } from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Returns the name of the chat input command.',
    code: async function(d) {
        if (!(d.ctx?.data instanceof ChatInputCommandInteraction)) return d.logs.error(
            'Disallowed function: $interactionCommandName just can be used inside command interactions.'
        )
        return d.ctx.data.commandName
    }
})
