import { BaseNode, CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction, DataType } from '@structures/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

export default class extends BaseInstruction {
    patterns = makePattern(/\$parseInt/)
    description = 'Parses an string into an integer.'
    identifier = 'bdjs:parseInt'
    version = '2.0.0'
    fields = [
        {
            name: 'String',
            description: 'The string to be converted.',
            type: DataType.String,
            required: true
        },
        {
            name: 'Radix',
            description: 'A value between 2 and 36 that specifies the base of the number in `string`.',
            type: DataType.Number,
            required: false
        }
    ]
    returns = DataType.Number
    resolve({ inside = '' }: Token<Transpiler>) {
        const [text, radix] = this.splitByDelimiter(inside)
        const elements: BaseNode[] = [this.transpiler.resolveString(text)]

        if (radix) elements.push(this.transpiler.resolveNumber(radix));

        return new CallNode({
            callee: new LiteralNode('parseInt'),
            parameters: new OperatorNode({
                elements,
                operator: ', '
            }),
            zero: false
        })
    }
}