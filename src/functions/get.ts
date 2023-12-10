import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Get a variable from the environment data.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name]) {
        if (name === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        
        return d.getEnvironmentVariable(name)
    }
})