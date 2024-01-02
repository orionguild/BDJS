import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Switch statement.',
    parameters: [
        {
            name: 'Text',
            description: 'Text to select the case.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Cases',
            description: 'Switch cases.',
            required: true,
            resolver: 'String',
            compile: false,
            value: 'none'
        }
    ],
    code: async function(d, [text, states]) {
        if (text === undefined) throw new d.error(d, 'required', 'Text', d.function!.name)
        if (states === undefined) throw new d.error(d, 'required', 'Cases', d.function!.name)

        const cases = new Map<string, string>()
        const data = d.extend(d)
        
        data.functions.add({
            name: 'case',
            description: 'Switch case.',
            parameters: [
                {
                    name: 'Case name',
                    description: 'The name for this case.',
                    required: true,
                    resolver: 'String',
                    value: 'none'
                },
                {
                    name: 'Case code',
                    description: 'The code for this case.',
                    required: true,
                    resolver: 'String',
                    compile: false,
                    value: 'none'
                },
            ],
            code: async (t, [name, executable]) => {
                if (name === undefined) throw new t.error(t, 'required', 'Name', t.function!.name)
                if (executable === undefined) throw new t.error(t, 'required', 'Code', t.function!.name)
                cases.set(name, executable)
            }
        })
        .add({
            name: 'default',
            description: 'Set the default case.',
            parameters: [
                {
                    name: 'Case code',
                    description: 'The code for this case.',
                    required: true,
                    resolver: 'String',
                    compile: false,
                    value: 'none'
                },
            ],
            code: async (t, [executable]) => {
                if (executable === undefined) throw new t.error(t, 'required', 'Code', t.function!.name)
                cases.set('__BDJS__DEFAULT__', executable)
            }
        })

        await data.reader.compile(states, data)

        if (!cases.has('__BDJS__DEFAULT__'))
            throw new data.error(data, 'required', 'Default Case', data.function!.name)

        if (cases.has(text)) 
            return await d.reader.compile(cases.get(text)!, d)
        else 
            return await d.reader.compile(cases.get('__BDJS__DEFAULT__')!, d)
    }
})