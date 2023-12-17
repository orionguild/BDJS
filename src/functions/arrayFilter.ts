import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Filter array elements that mets the condition.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Condition',
            description: 'Condition to filter variables.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Separator',
            description: 'Separator to join the results.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function(d, [name, condition, sep = ',']) {
        if (condition === undefined) throw new d.error(d, 'required', 'Table Name', d.function?.name!)

        const args = d.getEnvironmentVariable(name)
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args)) 
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name!)

        const results: string[] = []

        // Filling cells.
        for (const element of args) {
            d.cells.data.push({
                name: 'element',
                value: element
            })
        }

        // Filtering cells.
        for (const cell of d.cells.data) {
            const compiled = await d.reader.compile(
                d.cells.parse(condition.trim(), cell.name, cell.value),
                d
            )

            const mets = d.condition.evaluate(compiled.code)
            if (mets) results.push(cell.value)
            
        }

        // Cleaning cached cells.
        d.cells.data.length = 0

        if (results.length > 0) return results.join(sep)
    }
})