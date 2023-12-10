import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Returns the installed version of BDJS.',
    code: async function(d) {
        return (require('../../package.json')).version
    }
})