import { BaseFunction } from '../structures/Function'
import { AutocompleteInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Check whether current interaction belongs to an autocomplete.',
    code: async function(d) {
        if (d.commandType !== 'anyInteraction')
            throw new d.error(d, 'disallowed', d.function!.name, '"anyInteraction" commands')
        return d.ctx?.raw instanceof AutocompleteInteraction
    }
})