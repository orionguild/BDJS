import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Execute a code field if the condition is met.',
    parameters: [
        {
            name: 'Condition',
            description: 'The condition to evaluate.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Then code',
            description: 'The code to execute if the condition is true.',
            required: true,
            resolver: 'String',
            compile: false,
            value: 'none'
        },
        {
            name: 'Else code',
            description: 'The code to execute if the condition is false.',
            required: false,
            resolver: 'String',
            compile: false,
            value: 'none'
        }
    ],
    code: async function(d, [condition, then, _else]) {
        if (condition === undefined) throw new d.error(d, 'required', 'condition', d.function?.name!)
        if (then === undefined) throw new d.error(d, 'required', 'then code', d.function?.name!)

        const evaluated = d.condition.evaluate(condition)
        if (evaluated) {
            const result = await d.reader.compile(then, d)
            if (result?.code) return result.code
        } else if (!evaluated && _else) {
            const result = await d.reader.compile(_else, d)
            if (result?.code) return result.code
        }
    }
})