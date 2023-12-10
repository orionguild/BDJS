import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check if the variable name exists in the environment data.',
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
        
        return d.hasEnvironmentVariable(name)
    }
})