import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Get context message arguments, if any.',
    parameters: [
        {
            name: 'Index',
            description: 'Argument index.',
            required: true,
            resolver: 'Number',
            value: 'none'
        },
        {
            name: 'End Index',
            description: 'The slice end index.',
            required: false,
            resolver: 'Number',
            value: 'none'
        }
    ],
    code: async function(d, [index = '0', end]) {
        if (!['prefixed', 'unprefixed', 'always'].includes(d.commandType))
            throw new d.error(d, 'disallowed', d.function?.name!, 'Message-based events')
        if (isNaN(Number(index)) || Number(index) < 0 || Number(index) > d.getEnvironmentVariable('__BDJS__ARGS__').length)
            throw new d.error(d, 'invalid', 'Index', d.function?.name!)
        if (end && isNaN(Number(end)) || Number(end) < 0 || Number(end) > d.getEnvironmentVariable('__BDJS__ARGS__').length || Number(end) < Number(index))
            throw new d.error(d, 'invalid', 'End Index', d.function?.name!)
        return end 
            ? d.getEnvironmentVariable('__BDJS__ARGS__').slice(Number(index), Number(end)).join(' ')
            : d.getEnvironmentVariable('__BDJS__ARGS__').at(Number(index))
    }
})