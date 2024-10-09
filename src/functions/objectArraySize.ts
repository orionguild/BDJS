import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check the size of an array object.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this object.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Property',
            description: 'The array property to be checked.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name, property, value]) {
        if (name === undefined) throw new d.error(d, 'required', 'Object Name', d.function!.name)
        if (value === undefined) throw new d.error(d, 'required', 'Object Value', d.function!.name)
        if (!d.hasEnvironmentVariable(name)) throw new d.error(d, 'invalid', 'Object Name', d.function!.name)

        const object = d.getEnvironmentVariable(name)

        if (typeof object !== 'object') throw new d.error(d, 'invalid', 'Object', d.function!.name)
        if (!Object.prototype.hasOwnProperty.call(object, property)) throw new d.error(d, 'invalid', 'Object Property', d.function!.name)
        if (!Array.isArray(object[property])) throw new d.error(d, 'custom', `"${property}" is not a valid array!`)

        return String(object[property].length)
    }
})