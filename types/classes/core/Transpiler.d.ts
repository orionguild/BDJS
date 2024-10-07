import { BaseNode, CallNode, LiteralNode, NodeType, OperatorNode } from './Nodes';
import { BaseTranspiler, Registry, Token } from 'akore';
/**
 * The main transpiler class.
 */
export declare class Transpiler extends BaseTranspiler {
    #private;
    /**
     * Creates an schema registry.
     */
    registry: Registry<NodeType>;
    /**
     * Creates a new instance of the Transpiler class.
     */
    constructor();
    /**
     * Converts a token into a node.
     * @param token The token to convert.
     * @returns The converted node.
     * @throws Error if the converted node does not match the expected schema.
     */
    nodify(token: Token<this>): BaseNode<NodeType, unknown>;
    /**
     * Converts an array of tokens into nodes.
     * @param tokens - The tokens to convert.
     * @returns The converted nodes.
     * @throws Error if some converted node does not match the expected schema.
     */
    bulkNodify(tokens: Token<this>[]): BaseNode<NodeType, unknown>[];
    /**
     * Transpiles the given source code into JavaScript code.
     * @param source The source code to transpile.
     * @returns The transpiled code.
     */
    transpile(source: string, strict?: boolean): string;
    /**
     * Wraps the string as a condition node.
     * @param code - The input code to wrap.
     * @param [infer=true] - Automatically transpile condition left and righthands based on the condition operator.
     * @returns A ConditionNode representing the transpiled condition.
     */
    resolveCondition(code: string, infer?: boolean): LiteralNode | OperatorNode;
    /**
     * Transpiles a code into a Number.
     * @param code - The input code to transpile.
     * @returns A CallNode representing the transpiled number code.
     */
    resolveNumber(code: string): LiteralNode | CallNode;
    /**
     * Transpiles a code into an OperatorNode.
     * @param code - The input code to transpile.
     * @param operator - The operator to use between sequence elements.
     * @returns An OperatorNode representing the transpiled code.
     */
    resolveSequence(code: string, operator?: string): OperatorNode;
    /**
     * Transpiles a code into a String.
     * @param code - The input code to transpile.
     * @returns A CallNode representing the transpiled string code.
     */
    resolveString(code: string): LiteralNode | CallNode;
    /**
     * Returns the location of the native functions.
     */
    private get instructions_path();
}
