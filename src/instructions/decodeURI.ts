import { BaseInstruction, DataType } from '@structures/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { LexicalFlags, Token } from 'akore'

export default class extends BaseInstruction {
    patterns = makePattern(/\$decodeURI/)
    description = 'Gets the unencoded version of an encoded Uniform Resource Identifier (URI).'
    identifier = 'bdjs:decodeURI'
    version = '2.0.0'
    flags = LexicalFlags.UNSTOPPABLE
    fields = [
        {
            name: 'URI',
            description: 'A value representing an encoded URI.',
            type: DataType.String,
            required: true
        }
    ]
    returns = DataType.Number
    resolve({ inside = '' }: Token<Transpiler>) {
        return new CallNode({
            callee: new LiteralNode('decodeURI'),
            parameters: new OperatorNode({
                elements: [this.transpiler.resolveString(inside)],
                operator: ', '
            }),
            zero: false
        })
    }
}