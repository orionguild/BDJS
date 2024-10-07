"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("../classes/structures/BaseInstruction");
const Nodes_1 = require("../classes/core/Nodes");
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
const akore_1 = require("akore");
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)(/\$decodeURI/);
        this.description = 'Gets the unencoded version of an encoded Uniform Resource Identifier (URI).';
        this.identifier = 'bdjs:decodeURI';
        this.version = '2.0.0';
        this.flags = akore_1.LexicalFlags.UNSTOPPABLE;
        this.fields = [
            {
                name: 'URI',
                description: 'A value representing an encoded URI.',
                type: BaseInstruction_1.DataType.String,
                required: true
            }
        ];
        this.returns = BaseInstruction_1.DataType.Number;
    }
    resolve({ inside = '' }) {
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode('decodeURI'),
            parameters: new Nodes_1.OperatorNode({
                elements: [this.transpiler.resolveString(inside)],
                operator: ', '
            }),
            zero: false
        });
    }
}
exports.default = default_1;
