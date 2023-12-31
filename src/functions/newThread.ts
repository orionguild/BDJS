import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import { AnyThreadChannel } from 'discord.js'

export default new BaseFunction({
    description: 'Get information from a new thread.',
    parameters: [
        {
            name: 'Property',
            description: 'The property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [property]) {
        if (d.commandType !== 'threadUpdate')
            throw new d.error(d, 'disallowed', d.function!.name, 'onThreadUpdate event')
        if (property === undefined)
            throw new d.error(d, 'required', 'Property', d.function!.name)

        const types = Object.keys(Properties.Channel)
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function!.name)

        const thread = d.getEnvironmentVariable('__BDJS__NEW__THREAD__') as AnyThreadChannel

        return Properties.Thread[property.toLowerCase()].code(thread)
    }
})