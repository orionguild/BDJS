import { BaseNode, CallNode, LiteralNode, NodeType, OperatorNode, ProgramNode } from './Nodes'
import isMathConditionOperator from '@functions/isMathConditionOperator'
import { BaseTranspiler, Logger, Registry, Schema, Token } from 'akore'
import getConditionOperators from '@functions/getConditionOperators'
import { BaseInstruction } from '@structures/BaseInstruction'
import { lstatSync, readdirSync } from 'fs'
import { join } from 'path'

/**
 * The main transpiler class.
 */
export class Transpiler extends BaseTranspiler {
    /**
     * Creates an schema registry.
     */
    registry: Registry<NodeType>

    /**
     * Creates a new instance of the Transpiler class.
     */
    constructor() {
        super({
            logger: new Logger({ from: 'BDJS' }),
            schemas: {
                [NodeType.Program]: new Schema(NodeType.Program, [BaseNode]),
                [NodeType.Literal]: new Schema(NodeType.Literal, 'string'),
                [NodeType.Operator]: new Schema(NodeType.Operator, {
                    elements: [BaseNode],
                    operator: 'string'
                }),
                [NodeType.Call]: new Schema(NodeType.Call, {
                    parameters: OperatorNode,
                    callee: BaseNode,
                    zero: 'boolean'
                }),
                [NodeType.Assignment]: new Schema(NodeType.Assignment, [BaseNode]),
                [NodeType.ControlFlow]: new Schema(NodeType.ControlFlow, {
                    indicator: BaseNode,
                    consequent: [BaseNode]
                }),
                [NodeType.Block]: new Schema(NodeType.Block, [BaseNode])
            }
        })

        // Loading each instruction.
        this.#loadFunctions()
    }

    /**
     * Converts a token into a node.
     * @param token The token to convert.
     * @returns The converted node.
     * @throws Error if the converted node does not match the expected schema.
     */
    override nodify(token: Token<this>) {
        return super.nodify(token) as BaseNode<NodeType, unknown>
    }

    /**
     * Converts an array of tokens into nodes.
     * @param tokens - The tokens to convert.
     * @returns The converted nodes.
     * @throws Error if some converted node does not match the expected schema.
     */
    bulkNodify(tokens: Token<this>[]) {
        const nodes: BaseNode<NodeType, unknown>[] = []

        for (const token of tokens) {
            nodes.push(this.nodify(token))
        }

        return nodes
    }

    /**
     * Transpiles the given source code into JavaScript code.
     * @param source The source code to transpile.
     * @returns The transpiled code.
     */
    transpile(source: string, strict = true) {
        const program = new ProgramNode([]), tokens = this.lexer.tokenize(source)
        if (strict) program.push(new LiteralNode('"use strict"', true));

        for (let current = tokens.next(); current.done === false; current = tokens.next()) {
            program.push(this.nodify(current.value))
        }

        return this.registry.resolve(program)
    }

    /**
     * Wraps the string as a condition node.
     * @param code - The input code to wrap.
     * @param [infer=true] - Automatically transpile condition left and righthands based on the condition operator.
     * @returns A ConditionNode representing the transpiled condition.
     */
    resolveCondition(code: string, infer = true) {
        const OPERATORS_PATTERN = new RegExp(getConditionOperators().join('|'), 'g')
        const foundOperator = code.match(OPERATORS_PATTERN)?.[0]
        if (!foundOperator) return new LiteralNode(code);

        let [left, right] = code.split(foundOperator)
        left = left.trim(), right = right.trim();

        if (isMathConditionOperator(foundOperator) && infer) {
            // Transpile as numbers.
            const transpiledLeft = this.resolveNumber(left)
            const transpiledRight = this.resolveNumber(right)

            return new OperatorNode({
                elements: [transpiledLeft, transpiledRight],
                operator: foundOperator
            })
        } else if (!isMathConditionOperator(foundOperator) && infer) {
            // Transpile as strings.
            const transpiledLeft = this.resolveString(left)
            const transpiledRight = this.resolveString(right)

            return new OperatorNode({
                elements: [transpiledLeft, transpiledRight],
                operator: foundOperator
            })
        } else {
            // Return both sides if infer was disabled.
            return new OperatorNode({
                elements: [new LiteralNode(left), new LiteralNode(right)],
                operator: foundOperator
            })
        }
    }

    /**
     * Transpiles a code into a Number.
     * @param code - The input code to transpile.
     * @returns A CallNode representing the transpiled number code.
     */
    resolveNumber(code: string) {
        const tokens = [...this.lexer.tokenize(code)]

        if (tokens.length === 0) return new LiteralNode(isNaN(Number(code)) ? 'NaN' : code);

        const parts: BaseNode<NodeType, unknown>[] = []
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i]
            const before = code.slice(0, token.match.index)
            if (before) parts.push(new LiteralNode(isNaN(Number(before)) ? 'NaN' : before));
            parts.push(token.competence.resolve(token) as BaseNode<NodeType, unknown>)
            if (i === tokens.length) {
                const after = code.slice(token.match.index + token.total.length)
                if (after) parts.push(new LiteralNode(Number.isNaN(after) ? 'NaN' : after));
            }
        }

        return new CallNode({
            callee: new LiteralNode('Number'),
            parameters: new OperatorNode({
                elements: parts,
                operator: ' + ',
            }),
            zero: false
        })
    }

    /**
     * Transpiles a code into an OperatorNode.
     * @param code - The input code to transpile.
     * @param operator - The operator to use between sequence elements.
     * @returns An OperatorNode representing the transpiled code.
     */
    resolveSequence(code: string, operator = ', ') {
        const tokens = this.lexer.tokenize(code), sequence = new OperatorNode({ elements: [], operator })

        for (let current = tokens.next(); current.done === false; current = tokens.next()) {
            sequence.elements.push(this.nodify(current.value))
        }

        return sequence
    }

    /**
     * Transpiles a code into a String.
     * @param code - The input code to transpile.
     * @returns A CallNode representing the transpiled string code.
     */
    resolveString(code: string) {
        const tokens = [...this.lexer.tokenize(code)]

        if (tokens.length === 0) return new LiteralNode(`'${code}'`);

        const parts: BaseNode<NodeType, unknown>[] = []
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i]
            const before = code.slice(0, token.match.index)
            if (before) parts.push(new LiteralNode(`'${before}'`));
            parts.push(token.competence.resolve(token) as BaseNode<NodeType, unknown>)
            if (i === tokens.length) {
                const after = code.slice(token.match.index + token.total.length)
                if (after) parts.push(new LiteralNode(`'${after}'`));
            }
        }

        return new CallNode({
            callee: new LiteralNode('String'),
            parameters: new OperatorNode({
                elements: parts,
                operator: ' + ',
            }),
            zero: false
        })
    }

    /**
     * Load built-in functions from folders.
     */
    #loadFunctions() {
        const files = readdirSync(this.instructions_path)
            .sort((a, b) => b.length - a.length)

        for (const file of files) {
            const content = require(join(this.instructions_path, file))
            const instruction: BaseInstruction = new content.default(this)

            this.declare(instruction as any)
        }
    }

    /**
     * Returns the location of the native functions.
     */
    private get instructions_path() {
        return __dirname.replace(/classes\\core/, 'instructions')
    }
}