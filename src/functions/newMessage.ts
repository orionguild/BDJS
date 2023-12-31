import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import { Message } from 'discord.js'

export default new BaseFunction({
    description: 'Get information from a new message.',
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
        if (d.commandType !== 'messageUpdate')
            throw new d.error(d, 'disallowed', d.function!.name, 'onMessageUpdate event')
        if (property === undefined)
            throw new d.error(d, 'required', 'Property', d.function!.name)

        const types = Object.keys(Properties.Channel)
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function!.name)

        const message = d.getEnvironmentVariable('__BDJS__NEW__MESSAGE__') as Message

        return Properties.Message[property.toLowerCase()].code(message)
    }
})