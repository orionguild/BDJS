const { BaseFunction } = require('../index.js')

module.exports = new BaseFunction({
    description: 'Logs function content in console.',
    parameters: [
        {
            name: 'Content',
            description: 'The content to log.',
            required: true,
            compile: true,
            unescape: true,
            resolver: 'String',
            value: 'undefined'
        }
    ]
}).execute(async d => {
    const content = d.function.compiled.fields.map(f => f.value)
    console.log(...content)
})
