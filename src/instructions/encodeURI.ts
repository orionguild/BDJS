import { BaseInstruction, DataType } from '@structures/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { LexicalFlags, Token } from 'akore'

export default class extends BaseInstruction {
    patterns = makePattern(/\$encodeURI/)
    description = 'Encodes a text string as a valid Uniform Resource Identifier (URI)'
    identifier = 'bdjs:encodeURI'
    version = '2.0.0'
    flags = LexicalFlags.UNSTOPPABLE
    fields = [
        {
            name: 'URI',
            description: 'A value representing an unencoded URI.',
            type: DataType.String,
            required: true
        }
    ]
    returns = DataType.Number
    resolve({ inside = '' }: Token<Transpiler>) {
        return new CallNode({
            callee: new LiteralNode('encodeURI'),
            parameters: new OperatorNode({
                elements: [this.transpiler.resolveString(inside)],
                operator: ', '
            }),
            zero: false
        })
    }
}