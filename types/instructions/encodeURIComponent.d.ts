import { BaseInstruction, DataType } from '../classes/structures/BaseInstruction';
import { CallNode } from '../classes/core/Nodes';
import { Transpiler } from '../classes/core/Transpiler';
import { LexicalFlags, Token } from 'akore';
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    description: string;
    identifier: string;
    version: string;
    flags: LexicalFlags;
    fields: {
        name: string;
        description: string;
        type: DataType;
        required: boolean;
    }[];
    returns: DataType;
    resolve({ inside }: Token<Transpiler>): CallNode;
}
