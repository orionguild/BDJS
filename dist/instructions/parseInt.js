"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodes_1 = require("../classes/core/Nodes");
const BaseInstruction_1 = require("../classes/structures/BaseInstruction");
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)(/\$parseInt/);
        this.description = 'Parses an string into an integer.';
        this.identifier = 'bdjs:parseInt';
        this.version = '2.0.0';
        this.fields = [
            {
                name: 'String',
                description: 'The string to be converted.',
                type: BaseInstruction_1.DataType.String,
                required: true
            },
            {
                name: 'Radix',
                description: 'A value between 2 and 36 that specifies the base of the number in `string`.',
                type: BaseInstruction_1.DataType.Number,
                required: false
            }
        ];
        this.returns = BaseInstruction_1.DataType.Number;
    }
    resolve({ inside = '' }) {
        const [text, radix] = this.splitByDelimiter(inside);
        const elements = [this.transpiler.resolveString(text)];
        if (radix)
            elements.push(this.transpiler.resolveNumber(radix));
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode('parseInt'),
            parameters: new Nodes_1.OperatorNode({
                elements,
                operator: ', '
            }),
            zero: false
        });
    }
}
exports.default = default_1;
