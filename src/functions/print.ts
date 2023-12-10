import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Prints a text into the console.',
    parameters: [
        {
            name: 'Texts',
            description: 'The text to print into the console.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [text]) {
        if (text === undefined) throw new d.error(d, 'required', 'Texts', d.function?.name!)
        
        console.log(text)
    }
})