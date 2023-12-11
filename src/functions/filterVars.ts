import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Filter variables that mets the condition.',
    parameters: [
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
        },
        {
            name: 'Table',
            description: 'The database table name.',
            required: false,
            resolver: 'String',
            value: 'main'
        }
    ],
    code: async function(d, [condition, sep = ',', table = 'main']) {
        if (condition === undefined) throw new d.error(d, 'required', 'Table Name', d.function?.name!)

        const records = d.bot?.vars.getTable(table), results: string[] = []
        if (!records) throw new d.error(d, 'invalid', 'Table Name', d.function?.name!)

        // Filling cells.
        for (const [key, value] of Object.entries(records)) {
            d.cells.data.push({
                name: 'variableName',
                value: key
            },{
                name: 'variableValue',
                value
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