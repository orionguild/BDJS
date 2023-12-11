import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Exits the process.',
    code: async function(d) {
        process.exit()
    }
})