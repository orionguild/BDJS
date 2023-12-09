const { BaseFunction } = require('../dist/structures/Function')
const { FunctionManager } = require('../dist/managers/Function')
const { CommandManager } = require('../dist/managers/Command')
const { Condition } = require('../dist/util/Condition')
const { Data } = require('../dist/structures/Data')
const { Reader } = require('../dist/core/Reader')
const { Util } = require('../dist/util/Util')
const { join } = require('path')

const functions = new FunctionManager()
functions.set('print', require('../dist/functions/print').default)
functions.set('if', require('../dist/functions/if').default)
functions.set('lower', new BaseFunction({
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

const clonedData = Util.deepClone(data)
clonedData.functions.set('testing', {
    code: async (d, [text]) => {
        return text.toLowerCase()
    }
})

console.log(clonedData)

reader.compile(`
true
`.trim(), data).then((d) => {
    console.log(
        d
    )
})