import { ChatInputCommandInteraction } from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Returns the name of the chat input command.',
    code: async function(d) {
        if (!(d.ctx?.raw instanceof ChatInputCommandInteraction)) 
            throw new d.error(d, 'disallowed', d.function?.name!, 'command interactions')
        return d.ctx?.raw.commandName
    }
})
