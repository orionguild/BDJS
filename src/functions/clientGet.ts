import { BaseFunction } from '../structures/Function'
import Properties from '../util/Properties'

export default new BaseFunction({
    description: 'Get a client property.',
    parameters: [
        {
            name: 'Property',
            description: 'Client property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [property]) {
        if (property === undefined) throw new d.error(d, 'required', 'Property Name', d.function?.name!)

        const types = Object.keys(Properties.Bot)
        if (!types.includes(property.toLowerCase())) throw new d.error(d, 'invalid', 'Property', d.function?.name!)

        return Properties.Bot[property.toLowerCase()].code(d.bot!)
    }
})