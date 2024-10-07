import { Node } from "akore";
/**
 * Represents a node type in the AST.
 */
export declare enum NodeType {
    Program = "program",
    Literal = "literal",
    Operator = "operator",
    Call = "call",
    Assignment = "assignment",
    ControlFlow = "control-flow",
    Block = "block",
    Condition = "condition"
}
/**
 * Represents a base node in the AST.
 * @template Type The type of the node.
 * @template Value The value of the node.
 */
export declare class BaseNode<Type extends NodeType = NodeType, Value = unknown> extends Node<Type, Value> {
    semicolon: boolean;
    /**
     * Creates an instance of the BaseNode class.
     *
     * @param type The type of the node.
     * @param value The value of the node.
     * @param semicolon Indicates whether the node has a semicolon.
     */
    constructor(type: Type, value: Value, semicolon?: boolean);
}
/**
 * Represents a literal node in the AST.
 */
export declare class LiteralNode extends BaseNode<NodeType.Literal, string> {
    /**
     * Creates a new instance of the LiteralNode class.
     * @param value The value of the literal.
     * @param semicolon Indicates whether a semicolon should be added after the literal.
     */
    constructor(value: string, semicolon?: boolean);
    /**
     * Serializes the literal node to a string representation.
     * @returns The string representation of the literal node.
     */
    serialize(): string;
}
/**
 * Available options for an operator node.
 */
interface OperatorNodeValue {
    elements: BaseNode[];
    operator: string;
}
/**
 * Represents an operator node in the AST.
 */
export declare class OperatorNode extends BaseNode<NodeType.Operator, OperatorNodeValue> {
    /**
     * Creates a new instance of the OperatorNode class.
     * @param value The value of the operator node.
     * @param semicolon Indicates whether a semicolon should be added after the operator node.
     */
    constructor(value: OperatorNodeValue, semicolon?: boolean);
    /**
     * Gets the elements contained in the operator node.
     */
    get elements(): BaseNode<NodeType, unknown>[];
    /**
     * Gets the operator string of the operator node.
     */
    get operator(): string;
    /**
     * Serializes the operator node to a string representation.
     * @returns The serialized string representation of the operator node.
     */
    serialize(): string;
}
/**
 * Represents an assignment node in the AST.
 * @template Left The type of the left side of the assignment node.
 * @template Right The type of the right side of the assignment node.
 */
export declare class AssignmentNode<Left extends BaseNode, Right extends BaseNode> extends OperatorNode {
    /**
     * Creates a new instance of the AssignmentNode class.
     * @param left The left side of the assignment node.
     * @param right The right side of the assignment node.
     */
    constructor(left: Left, right: Right);
    /**
     * Gets the left side of the assignment node.
     * @returns The left side of the assignment node.
     */
    get left(): Left;
    /**
     * Gets the right side of the assignment node.
     * @returns The right side of the assignment node.
     */
    get right(): Right;
    /**
     * Serializes the assignment node to a string representation.
     * @returns The serialized string representation of the assignment node.
     */
    serialize(): `${string} = ${string}`;
}
/**
 * Represents a block node in the AST.
 */
export declare class BlockNode extends BaseNode<NodeType.Block, BaseNode[]> {
    /**
     * Creates a new instance of the BlockNode class.
     * @param nodes The nodes contained in the block.
     * @param semicolon Indicates whether a semicolon should be added after the block.
     */
    constructor(nodes: BaseNode[], semicolon?: boolean);
    /**
     * Adds a node to the beginning of the block.
     * @param node The node to add.
     */
    unshift(node: BaseNode): void;
    /**
     * Adds a node to the end of the block.
     * @param node The node to add.
     */
    push(node: BaseNode): void;
    /**
     * Gets the nodes contained in the block.
     */
    get nodes(): BaseNode<NodeType, unknown>[];
    /**
     * Serializes the block node to a string representation.
     * @returns The serialized string representation of the block node.
     */
    serialize(): string;
}
/**
 * Represents the value of a call node.
 */
interface CallNodeValue {
    /**
     * The parameters of the call.
     */
    parameters: OperatorNode;
    /**
     * The callee of the call.
     */
    callee: BaseNode;
    /**
     * Indicates whether the call is a zero call.
     * If true, the call is a zero call `(0, callee())`.
     * If false, the call is a normal call `callee()`.
     */
    zero: boolean;
}
/**
 * Represents a call node in the AST.
 */
export declare class CallNode extends BaseNode<NodeType.Call, CallNodeValue> {
    /**
     * Creates a new instance of the CallNode class.
     * @param value The value of the call node.
     * @param semicolon Indicates whether a semicolon should be added after the call node.
     */
    constructor(value: CallNodeValue, semicolon?: boolean);
    /**
     * Gets the parameters of the call node.
     */
    get parameters(): OperatorNode;
    /**
     * Gets the callee of the call node.
     */
    get callee(): BaseNode<NodeType, unknown>;
    /**
     * Gets whether the call node has zero value.
     */
    get zero(): boolean;
    /**
     * Serializes the call node to a string representation.
     * @returns The serialized string representation of the call node.
     */
    serialize(): string;
}
/**
 * Represents a control flow value.
 */
interface ControlFlowValue {
    /**
     * The indicator of the control flow.
     */
    indicator: BaseNode;
    /**
     * The consequent nodes of the control flow.
     */
    consequent: BaseNode[];
}
/**
 * Represents a control flow node in the AST.
 */
export declare class ControlFlowNode extends BaseNode<NodeType.ControlFlow, ControlFlowValue> {
    /**
     * Creates a new instance of the ControlFlowNode class.
     * @param value The value of the control flow node.
     * @param semicolon Indicates whether a semicolon should be added after the control flow node.
     */
    constructor(value: ControlFlowValue, semicolon?: boolean);
    /**
     * Gets the indicator node of the control flow.
     */
    get indicator(): BaseNode<NodeType, unknown>;
    /**
     * Gets the consequent nodes of the control flow.
     */
    get consequent(): BaseNode<NodeType, unknown>[];
    /**
     * Serializes the control flow node to a string representation.
     * @returns The serialized string representation of the control flow node.
     */
    serialize(): string;
}
/**
 * Represents a program node in the AST.
 */
export declare class ProgramNode extends BaseNode<NodeType.Program, BaseNode[]> {
    /**
     * Creates a new instance of the ProgramNode class.
     * @param nodes The nodes contained in the program.
     */
    constructor(nodes: BaseNode[]);
    /**
     * Adds one or more nodes to the beginning of the program.
     * @param nodes The nodes to add to the program.
     */
    unshift(...nodes: BaseNode[]): void;
    /**
     * Adds one or more nodes to the program.
     * @param nodes The nodes to be added.
     */
    push(...nodes: BaseNode[]): void;
    /**
     * Gets the nodes of the program.
     * @returns An array of BaseNode objects.
     */
    get nodes(): BaseNode<NodeType, unknown>[];
    /**
     * Serializes the program node and its child nodes into a string representation.
     * @returns The serialized string representation of the program node.
     */
    serialize(): string;
}
export {};
