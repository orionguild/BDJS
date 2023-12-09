const { BaseFunction } = require('../dist/structures/BaseFunction')
const { FunctionManager } = require('../dist/managers/Function')
const { CommandManager } = require('../dist/managers/Command')
const { Condition } = require('../dist/util/Condition')
const { Data } = require('../dist/structures/Data')
const { Reader } = require('../dist/core/Reader')
const { join } = require('path')

const functions = new FunctionManager()
functions.set('PRINT', require('../dist/functions/print').default)
functions.set('IF', require('../dist/functions/if').default)
functions.set('LOWER', new BaseFunction({
    description: 'xd',
    parameters: [{
        name: 'xd',
        description:'aw',
        compile:true,
        unescape:true
    }],
    code: async (d, [text]) => {
        return text.toLowerCase()
    }
}))

const commands = new CommandManager
commands.add({
    name: 'hola',
    type: 'ready',
    code: `
        $ping[true]
    `
}).load(join(__dirname, 'commands'), true)

const reader = new Reader

const data = new Data({
    env: {
        message: 'HELLO WORLD!'
    },
    functions,
    instanceTime: new Date,
    commandType: 'unknown',
    reader
})

reader.compile(`
true
`.trim(), data).then((d) => {
    console.log(
        d
    )
})