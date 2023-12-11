import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Return how many milliseconds took the Reader to interprete the code.',
    code: async function(d) {
        const now = new Date
        return now.getMilliseconds() - (d.instanceTime?.getMilliseconds() ?? 0)
    }
})