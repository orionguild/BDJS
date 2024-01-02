import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import { Activity } from 'discord.js'

export default new BaseFunction({
    description: 'Get information from an old activity.',
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
        if (d.commandType !== 'presenceUpdate')
            throw new d.error(d, 'disallowed', d.function!.name, 'onPresenceUpdate event')
        if (property === undefined)
            throw new d.error(d, 'required', 'Property', d.function!.name)

        const types = Object.keys(Properties.Activity)
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function!.name)

        const activity = d.getEnvironmentVariable('__BDJS__OLD__PRESENCE__') as Activity

        return Properties.Activity[property.toLowerCase()].code(activity)
    }
})
