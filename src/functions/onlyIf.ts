import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Execute a code if the condition is met.',
    parameters: [
        {
            name: 'Condition',
            description: 'Condition to be solved.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Error Code',
            description: 'Code to execute if the condition is not met.',
            required: false,
            resolver: 'String',
            compile: false,
            value: 'none'
        }
    ],
    code: async function(d, [condition, code]) {
        if (condition === undefined) throw new d.error(d, 'required', 'Condition', d.function?.name!)

        const solves = d.condition.evaluate(condition)

        if (!solves) {
            d.stop = true;
            if (code) {
                const data = d.extend(d)
                data.stop = false
                await data.reader.compile(code, data)
            }
        }
        
    }
})