const { Transpiler } = require('../dist/classes/core/Transpiler')

const transpiler = new Transpiler()
const result = transpiler.transpile('$encodeURIComponent[hola amuxe]', false)

console.log(result)