import { AutocompleteInteraction, ApplicationCommandOptionChoiceData } from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Responds an autocomplete interaction.',
    parameters: [
        {
            name: 'Options',
            description: 'Options to be appended to the autocomplete response.',
            required: true,
            compile: false,
            value: 'none'
        }
    ],
    code: async function(d, [options]) {
        if ((d.commandType === 'anyInteraction' && !d.ctx?.interaction?.isAutocomplete()) || d.commandType !== 'autocompleteInteraction')
            throw new d.error(d, 'disallowed', d.function!.name, 'autocompleteInteraction')
        if (options === undefined)
            throw new d.error(d, 'required', 'Options', d.function!.name)

        const data = d.extend(d), choices: ApplicationCommandOptionChoiceData[] = []
        data.functions.add({
            name: 'appendOption',
            description: 'Appends an option to the response.',
            code: async (t, [name, value]) => {
                if (name === undefined)
                    throw new d.error(d, 'required', 'Option Name', t.function!.name)
                if (value === undefined)
                    throw new d.error(d, 'required', 'Option Value', t.function!.name)
                choices.push({ name, value })
            }
        });

        await (d.ctx?.interaction as AutocompleteInteraction).respond(choices)
    }
})
