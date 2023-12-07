const { BaseFunction } = require('../index.js')

module.exports = new BaseFunction({
    description: 'Fetch an element from an array.',
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
            name: 'Index',
            description: 'The element index.',
            required: true,
            compile: true,
            unescape: true,
            resolver: 'Number',
            value: 'undefined'
        }
    ]
}).execute(async d => {
    const [name, values, sep = ','] = d.function.compiled.fields.map(f => f.value)
})
