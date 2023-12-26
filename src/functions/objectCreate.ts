import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Creates an object.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this object.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Body',
            description: 'Object body to be parsed.',
            required: true,
            resolver: 'Object',
            value: 'none'
        }
    ],
    code: async function(d, [name, object]) {
        if (name === undefined) throw new d.error(d, 'required', 'Object Name', d.function?.name!)
        if (object === undefined) throw new d.error(d, 'required', 'Object', d.function?.name!)

        if (!(object.startsWith('{')) && !(object.endsWith('}')))
            throw new d.error(d, 'invalid', 'Object', d.function?.name!)

        try {
            d.setEnvironmentVariable(name, JSON.parse(object))
        } catch {
            throw new d.error(d, 'invalid', 'Object', d.function?.name!)
        }
    }
})