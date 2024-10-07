"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Transpiler_instances, _Transpiler_loadFunctions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transpiler = void 0;
const Nodes_1 = require("./Nodes");
const isMathConditionOperator_1 = __importDefault(require("../../utils/functions/isMathConditionOperator"));
const akore_1 = require("akore");
const getConditionOperators_1 = __importDefault(require("../../utils/functions/getConditionOperators"));
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * The main transpiler class.
 */
class Transpiler extends akore_1.BaseTranspiler {
    /**
     * Creates a new instance of the Transpiler class.
     */
    constructor() {
        super({
            logger: new akore_1.Logger({ from: 'BDJS' }),
            schemas: {
                [Nodes_1.NodeType.Program]: new akore_1.Schema(Nodes_1.NodeType.Program, [Nodes_1.BaseNode]),
                [Nodes_1.NodeType.Literal]: new akore_1.Schema(Nodes_1.NodeType.Literal, 'string'),
                [Nodes_1.NodeType.Operator]: new akore_1.Schema(Nodes_1.NodeType.Operator, {
                    elements: [Nodes_1.BaseNode],
                    operator: 'string'
                }),
                [Nodes_1.NodeType.Call]: new akore_1.Schema(Nodes_1.NodeType.Call, {
                    parameters: Nodes_1.OperatorNode,
                    callee: Nodes_1.BaseNode,
                    zero: 'boolean'
                }),
                [Nodes_1.NodeType.Assignment]: new akore_1.Schema(Nodes_1.NodeType.Assignment, [Nodes_1.BaseNode]),
                [Nodes_1.NodeType.ControlFlow]: new akore_1.Schema(Nodes_1.NodeType.ControlFlow, {
                    indicator: Nodes_1.BaseNode,
                    consequent: [Nodes_1.BaseNode]
                }),
                [Nodes_1.NodeType.Block]: new akore_1.Schema(Nodes_1.NodeType.Block, [Nodes_1.BaseNode])
            }
        });
        _Transpiler_instances.add(this);
        // Loading each instruction.
        __classPrivateFieldGet(this, _Transpiler_instances, "m", _Transpiler_loadFunctions).call(this);
    }
    /**
     * Converts a token into a node.
     * @param token The token to convert.
     * @returns The converted node.
     * @throws Error if the converted node does not match the expected schema.
     */
    nodify(token) {
        return super.nodify(token);
    }
    /**
     * Converts an array of tokens into nodes.
     * @param tokens - The tokens to convert.
     * @returns The converted nodes.
     * @throws Error if some converted node does not match the expected schema.
     */
    bulkNodify(tokens) {
        const nodes = [];
        for (const token of tokens) {
            nodes.push(this.nodify(token));
        }
        return nodes;
    }
    /**
     * Transpiles the given source code into JavaScript code.
     * @param source The source code to transpile.
     * @returns The transpiled code.
     */
    transpile(source, strict = true) {
        const program = new Nodes_1.ProgramNode([]), tokens = this.lexer.tokenize(source);
        if (strict)
            program.push(new Nodes_1.LiteralNode('"use strict"', true));
        for (let current = tokens.next(); current.done === false; current = tokens.next()) {
            program.push(this.nodify(current.value));
        }
        return this.registry.resolve(program);
    }
    /**
     * Wraps the string as a condition node.
     * @param code - The input code to wrap.
     * @param [infer=true] - Automatically transpile condition left and righthands based on the condition operator.
     * @returns A ConditionNode representing the transpiled condition.
     */
    resolveCondition(code, infer = true) {
        const OPERATORS_PATTERN = new RegExp((0, getConditionOperators_1.default)().join('|'), 'g');
        const foundOperator = code.match(OPERATORS_PATTERN)?.[0];
        if (!foundOperator)
            return new Nodes_1.LiteralNode(code);
        let [left, right] = code.split(foundOperator);
        left = left.trim(), right = right.trim();
        if ((0, isMathConditionOperator_1.default)(foundOperator) && infer) {
            // Transpile as numbers.
            const transpiledLeft = this.resolveNumber(left);
            const transpiledRight = this.resolveNumber(right);
            return new Nodes_1.OperatorNode({
                elements: [transpiledLeft, transpiledRight],
                operator: foundOperator
            });
        }
        else if (!(0, isMathConditionOperator_1.default)(foundOperator) && infer) {
            // Transpile as strings.
            const transpiledLeft = this.resolveString(left);
            const transpiledRight = this.resolveString(right);
            return new Nodes_1.OperatorNode({
                elements: [transpiledLeft, transpiledRight],
                operator: foundOperator
            });
        }
        else {
            // Return both sides if infer was disabled.
            return new Nodes_1.OperatorNode({
                elements: [new Nodes_1.LiteralNode(left), new Nodes_1.LiteralNode(right)],
                operator: foundOperator
            });
        }
    }
    /**
     * Transpiles a code into a Number.
     * @param code - The input code to transpile.
     * @returns A CallNode representing the transpiled number code.
     */
    resolveNumber(code) {
        const tokens = [...this.lexer.tokenize(code)];
        if (tokens.length === 0)
            return new Nodes_1.LiteralNode(isNaN(Number(code)) ? 'NaN' : code);
        const parts = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const before = code.slice(0, token.match.index);
            if (before)
                parts.push(new Nodes_1.LiteralNode(isNaN(Number(before)) ? 'NaN' : before));
            parts.push(token.competence.resolve(token));
            if (i === tokens.length) {
                const after = code.slice(token.match.index + token.total.length);
                if (after)
                    parts.push(new Nodes_1.LiteralNode(Number.isNaN(after) ? 'NaN' : after));
            }
        }
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode('Number'),
            parameters: new Nodes_1.OperatorNode({
                elements: parts,
                operator: ' + ',
            }),
            zero: false
        });
    }
    /**
     * Transpiles a code into an OperatorNode.
     * @param code - The input code to transpile.
     * @param operator - The operator to use between sequence elements.
     * @returns An OperatorNode representing the transpiled code.
     */
    resolveSequence(code, operator = ', ') {
        const tokens = this.lexer.tokenize(code), sequence = new Nodes_1.OperatorNode({ elements: [], operator });
        for (let current = tokens.next(); current.done === false; current = tokens.next()) {
            sequence.elements.push(this.nodify(current.value));
        }
        return sequence;
    }
    /**
     * Transpiles a code into a String.
     * @param code - The input code to transpile.
     * @returns A CallNode representing the transpiled string code.
     */
    resolveString(code) {
        const tokens = [...this.lexer.tokenize(code)];
        if (tokens.length === 0)
            return new Nodes_1.LiteralNode(`'${code}'`);
        const parts = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const before = code.slice(0, token.match.index);
            if (before)
                parts.push(new Nodes_1.LiteralNode(`'${before}'`));
            parts.push(token.competence.resolve(token));
            if (i === tokens.length) {
                const after = code.slice(token.match.index + token.total.length);
                if (after)
                    parts.push(new Nodes_1.LiteralNode(`'${after}'`));
            }
        }
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode('String'),
            parameters: new Nodes_1.OperatorNode({
                elements: parts,
                operator: ' + ',
            }),
            zero: false
        });
    }
    /**
     * Returns the location of the native functions.
     */
    get instructions_path() {
        return __dirname.replace(/classes\\core/, 'instructions');
    }
}
exports.Transpiler = Transpiler;
_Transpiler_instances = new WeakSet(), _Transpiler_loadFunctions = function _Transpiler_loadFunctions() {
    const files = (0, fs_1.readdirSync)(this.instructions_path)
        .sort((a, b) => b.length - a.length);
    for (const file of files) {
        const content = require((0, path_1.join)(this.instructions_path, file));
        const instruction = new content.default(this);
        this.declare(instruction);
    }
};
