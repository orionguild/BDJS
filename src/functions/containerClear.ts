import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Clears the container.',
    code: async function(d) {
        d.container.clear()
    }
})