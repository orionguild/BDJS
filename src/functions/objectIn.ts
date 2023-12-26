import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check if the provided key exists in the object.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this object.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Key',
            description: 'The key name to be checked.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name, key]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Object Name', d.function?.name!)
        if (key === undefined)
            throw new d.error(d, 'required', 'Object Key', d.function?.name!)

        if (!d.hasEnvironmentVariable(name))
            throw new d.error(d, 'invalid', 'Object Name', d.function?.name!)

        let object = d.getEnvironmentVariable(name)

        if (typeof object !== 'object' || (typeof object === 'object' && !(JSON.stringify(object).startsWith('{')) && !(JSON.stringify(object).endsWith('}'))))
            throw new d.error(d, 'invalid', 'Object', d.function?.name!)

        return key in object
    }
})