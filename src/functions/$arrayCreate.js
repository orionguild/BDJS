const { BaseFunction } = require('../index.js')

module.exports = new BaseFunction({
    description: 'Creates a new array from a text split.',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            required: true,
            compile: true,
            unescape: true,
            resolver: 'String',
            value: 'undefined'
        },
        {
            name: 'Text',
            description: 'The text to split.',
            required: true,
            compile: true,
            unescape: true,
            resolver: 'String',
            value: 'undefined'
        },
        {
            name: 'Separator',
            description: 'The separator to split the text.',
            required: false,
            compile: true,
            unescape: true,
            resolver: 'String',
            value: ','
        }
    ]
}).execute(async d => {
    const [name, values, sep = ','] = d.function.compiled.fields.map(f => f.value)
})
