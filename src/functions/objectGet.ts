import { BaseFunction } from '../structures/Function'
import * as _ from 'lodash'

export default new BaseFunction({
    description: 'Get a property value from an object.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this object.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Path',
            description: 'Property path to set the value.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name, path]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Object Name', d.function?.name!)
        if (path === undefined)
            throw new d.error(d, 'required', 'Property Path', d.function?.name!)

        if (!d.hasEnvironmentVariable(name))
            throw new d.error(d, 'invalid', 'Object Name', d.function?.name!)

        let object = d.getEnvironmentVariable(name)

        if (typeof object !== 'object' || (typeof object === 'object' && !(JSON.stringify(object).startsWith('{')) && !(JSON.stringify(object).endsWith('}'))))
            throw new d.error(d, 'invalid', 'Object', d.function?.name!)

        return _.get(object, path)
    }
})