import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Code inside is ignore.',
    parameters: [
        {
            name: 'Code',
            description: 'The condition to evaluate.',
            required: true,
            resolver: 'String',
            value: 'none',
            compile: false
        }
    ],
    code: async function(d, [inside]) {
        if (inside === undefined) throw new d.error(d, 'required', 'Inside', d.function?.name!)
    }
})