import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Slices a text.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'From',
            description: 'Index to start slicing the text.',
            required: true,
            resolver: 'Number',
            value: 'none'
        },
        {
            name: 'To',
            description: 'End index to slice the text.',
            required: false,
            resolver: 'Number',
            value: 'none'
        }
    ],
    code: async function(d, [text, from, to]) {
        if (text === undefined)
            throw new d.error(d, 'required', 'Text', d.function!.name)
        if (from === undefined)
            throw new d.error(d, 'required', 'Start Index', d.function!.name)
        if (isNaN(Number(from)) || (to && isNaN(Number(to))))
            throw new d.error(d, 'required', 'Indexes', d.function!.name)

        return text.slice(Number(from), to ? Number(to) : undefined)
    }
})
