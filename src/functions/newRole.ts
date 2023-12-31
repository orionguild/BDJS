import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'
import { Role } from 'discord.js'

export default new BaseFunction({
    description: 'Get information from an old role.',
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
        if (d.commandType !== 'roleUpdate')
            throw new d.error(d, 'disallowed', d.function!.name, 'onRoleUpdate event')
        if (property === undefined)
            throw new d.error(d, 'required', 'Property', d.function!.name)

        const types = Object.keys(Properties.Channel)
        if (!types.includes(property.toLowerCase()))
            throw new d.error(d, 'invalid', 'Property', d.function!.name)

        const role = d.getEnvironmentVariable('__BDJS__NEW__ROLE__') as Role

        return Properties.Role[property.toLowerCase()].code(role)
    }
})