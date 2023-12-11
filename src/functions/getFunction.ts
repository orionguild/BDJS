import { BaseFunction } from '../structures/Function'
import { Data } from '../structures/Data'

function getFunction(d: Data, func: BaseFunction, property: string) {
    switch(property.toLowerCase()) {
        case 'description':
            return func.description
        case 'parameters':
            return (func.parameters && func.parameters?.length > 0 ? func.parameters?.map(f => {
                return f.required ? f.name.toString() : f.name.toLowerCase() + '?'
            }).join(';') : 'none')
        case 'supportbuilders':
            return func.builders + ''
        case 'supportinjection':
            return func.injectable + ''
        default:
            return 'none'
    }
}

export default new BaseFunction({
    description: 'Get a BDJS function property.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name, property]) {
        if (name === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        
        const func = d.functions?.get(name.toLowerCase())
        if (!func) throw new d.error(d, 'invalid', 'name', d.function?.name!)

        const properties = [
            'description', 'parameters',
            'supportbuilders', 'supportinjection'
        ]
        if (!properties.includes(property.toLowerCase())) throw new d.error(d, 'invalid', 'property', d.function?.name!)

        return getFunction(d, func, property)
    }
})