import { BaseInstruction, DataType } from '@structures/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { LexicalFlags, Token } from 'akore'

export default class extends BaseInstruction {
    patterns = makePattern(/\$isNumber/)
    description = 'Returns a boolean value that indicates whether a value is the reserved value NaN (not a number).'
    identifier = 'bdjs:isNumber'
    version = '2.0.0'
    flags = LexicalFlags.UNSTOPPABLE
    fields = [
        {
            name: 'Number',
            description: 'A numeric value.',
            type: DataType.Number,
            required: true
        }
    ]
    returns = DataType.Boolean
    resolve({ inside = '' }: Token<Transpiler>) {
        return new CallNode({
            callee: new LiteralNode('isNaN'),
            parameters: new OperatorNode({
                elements: [this.transpiler.resolveNumber(inside)],
                operator: ', '
            }),
            zero: false
        })
    }
}