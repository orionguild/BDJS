const { Reader } = require('../src/core/Reader')
const { Data } = require('../src/structures/Data')
const { inspect } = require('util')
const { Bot } = require('../src/index')

const client = new Bot({
    events: [
        'ready'
    ],
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ],
    prefixes: [
        '+'
    ]
})

const data = new Data({
    commandType: 'unknown',
    env: {},
    instanceTime: Date.now()
})

Reader.compile(`
$amistad_es_amigo[si;o;no]
yo digo q smn
$yastas[mami]
`, data).then(res => {
    const t = inspect(res.compiled.strings.map(x => x.value), {
        colors: true
    })
    const f = inspect(res.compiled.functions.map(x => x.toString), {
        colors: true
    })

    console.log('COMPILED_TEXTS', t)
    console.log('COMPILED_FUNCTIONS', f)
})