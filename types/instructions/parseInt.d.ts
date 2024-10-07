import { CallNode } from '../classes/core/Nodes';
import { BaseInstruction, DataType } from '../classes/structures/BaseInstruction';
import { Transpiler } from '../classes/core/Transpiler';
import { Token } from 'akore';
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    description: string;
    identifier: string;
    version: string;
    fields: {
        name: string;
        description: string;
        type: DataType;
        required: boolean;
    }[];
    returns: DataType;
    resolve({ inside }: Token<Transpiler>): CallNode;
}
