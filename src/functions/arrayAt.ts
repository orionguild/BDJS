import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Returns the element of an array at the given index.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Index',
            description: 'Element index.',
            required: true,
            resolver: 'Number',
            value: 'none'
        }
    ],
    code: async function(d, [name, index]) {
        if (name === undefined) throw new d.error(d, 'required', 'Array Name', d.function?.name!)
        if (index === undefined) throw new d.error(d, 'required', 'Index', d.function?.name!)

        const args = d.getEnvironmentVariable(name)
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args)) 
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name!)
        if (isNaN(Number(index)) || Number(index) < 0 || Number(index) > args.length)
            throw new d.error(d, 'invalid', 'Index', d.function?.name!)
        
        return args.at(Number(index))
    }
})