import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Return how many milliseconds took the Reader to interprete the code.',
    code: async function(d) {
        const start: number = d.getEnvironmentVariable('__BDJS__PERFORMANCE__')
        return (performance.now() - start).toString()
    }
})