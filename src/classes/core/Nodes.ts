import { Node } from "akore"

/**
 * Represents a node type in the AST.
 */
export enum NodeType {
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
export class BaseNode<Type extends NodeType = NodeType, Value = unknown> extends Node<Type, Value> {
    /**
     * Creates an instance of the BaseNode class.
     *
     * @param type The type of the node.
     * @param value The value of the node.
     * @param semicolon Indicates whether the node has a semicolon.
     */
    constructor(type: Type, value: Value, public semicolon = false) {
        super(type, value)
    }
}

/**
 * Represents a literal node in the AST.
 */
export class LiteralNode extends BaseNode<NodeType.Literal, string> {
    /**
     * Creates a new instance of the LiteralNode class.
     * @param value The value of the literal.
     * @param semicolon Indicates whether a semicolon should be added after the literal.
     */
    constructor(value: string, semicolon?: boolean) {
        super(NodeType.Literal, value, semicolon);
    }

    /**
     * Serializes the literal node to a string representation.
     * @returns The string representation of the literal node.
     */
    serialize() {
        return this.value;
    }
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
export class OperatorNode extends BaseNode<NodeType.Operator, OperatorNodeValue> {
    /**
     * Creates a new instance of the OperatorNode class.
     * @param value The value of the operator node.
     * @param semicolon Indicates whether a semicolon should be added after the operator node.
     */
    constructor(value: OperatorNodeValue, semicolon?: boolean) {
        super(NodeType.Operator, value, semicolon)
    }

    /**
     * Gets the elements contained in the operator node.
     */
    get elements() {
        return this.value.elements
    }

    /**
     * Gets the operator string of the operator node.
     */
    get operator() {
        return this.value.operator
    }

    /**
     * Serializes the operator node to a string representation.
     * @returns The serialized string representation of the operator node.
     */
    serialize() {
        return this.elements.map((node) => node.serialize()).join(this.value.operator)
    }
}

/**
 * Represents an assignment node in the AST.
 * @template Left The type of the left side of the assignment node.
 * @template Right The type of the right side of the assignment node.
 */
export class AssignmentNode<Left extends BaseNode, Right extends BaseNode> extends OperatorNode {
    /**
     * Creates a new instance of the AssignmentNode class.
     * @param left The left side of the assignment node.
     * @param right The right side of the assignment node.
     */
    constructor(left: Left, right: Right) {
        super({ elements: [left, right], operator: " = " }, false)
    }

    /**
     * Gets the left side of the assignment node.
     * @returns The left side of the assignment node.
     */
    get left() {
        return this.elements[0] as Left
    }

    /**
     * Gets the right side of the assignment node.
     * @returns The right side of the assignment node.
     */
    get right() {
        return this.elements[1] as Right
    }

    /**
     * Serializes the assignment node to a string representation.
     * @returns The serialized string representation of the assignment node.
     */
    serialize() {
        return super.serialize() as `${string} = ${string}`
    }
}

/**
 * Represents a block node in the AST.
 */
export class BlockNode extends BaseNode<NodeType.Block, BaseNode[]> {
    /**
     * Creates a new instance of the BlockNode class.
     * @param nodes The nodes contained in the block.
     * @param semicolon Indicates whether a semicolon should be added after the block.
     */
    constructor(nodes: BaseNode[], semicolon?: boolean) {
        super(NodeType.Block, nodes, semicolon)
    }

    /**
     * Adds a node to the beginning of the block.
     * @param node The node to add.
     */
    unshift(node: BaseNode) {
        this.value.unshift(node)
    }

    /**
     * Adds a node to the end of the block.
     * @param node The node to add.
     */
    push(node: BaseNode) {
        this.value.push(node)
    }

    /**
     * Gets the nodes contained in the block.
     */
    get nodes() {
        return this.value
    }

    /**
     * Serializes the block node to a string representation.
     * @returns The serialized string representation of the block node.
     */
    serialize() {
        return `{ ${this.nodes.map((node) => node.serialize()).join("\n")} }`
    }
}

/**
 * Represents the value of a call node.
 */
interface CallNodeValue {
    /**
     * The parameters of the call.
     */
    parameters: OperatorNode
    /**
     * The callee of the call.
     */
    callee: BaseNode
    /**
     * Indicates whether the call is a zero call.
     * If true, the call is a zero call `(0, callee())`.
     * If false, the call is a normal call `callee()`.
     */
    zero: boolean
}

/**
 * Represents a call node in the AST.
 */
export class CallNode extends BaseNode<NodeType.Call, CallNodeValue> {
    /**
     * Creates a new instance of the CallNode class.
     * @param value The value of the call node.
     * @param semicolon Indicates whether a semicolon should be added after the call node.
     */
    constructor(value: CallNodeValue, semicolon?: boolean) {
        super(NodeType.Call, value, semicolon)
    }

    /**
     * Gets the parameters of the call node.
     */
    get parameters() {
        return this.value.parameters
    }

    /**
     * Gets the callee of the call node.
     */
    get callee() {
        return this.value.callee
    }

    /**
     * Gets whether the call node has zero value.
     */
    get zero() {
        return this.value.zero
    }

    /**
     * Serializes the call node to a string representation.
     * @returns The serialized string representation of the call node.
     */
    serialize() {
        const callee = this.zero ? `(0, ${this.callee.serialize()})` : this.callee.serialize(), parameters = this.parameters.serialize()
        return `${callee}(${parameters})`
    }
}

/**
 * Represents a control flow value.
 */
interface ControlFlowValue {
    /**
     * The indicator of the control flow.
     */
    indicator: BaseNode
    /**
     * The consequent nodes of the control flow.
     */
    consequent: BaseNode[]
}

/**
 * Represents a control flow node in the AST.
 */
export class ControlFlowNode extends BaseNode<NodeType.ControlFlow, ControlFlowValue> {
    /**
     * Creates a new instance of the ControlFlowNode class.
     * @param value The value of the control flow node.
     * @param semicolon Indicates whether a semicolon should be added after the control flow node.
     */
    constructor(value: ControlFlowValue, semicolon?: boolean) {
        super(NodeType.ControlFlow, value, semicolon)
    }

    /**
     * Gets the indicator node of the control flow.
     */
    get indicator() {
        return this.value.indicator
    }

    /**
     * Gets the consequent nodes of the control flow.
     */
    get consequent() {
        return this.value.consequent
    }

    /**
     * Serializes the control flow node to a string representation.
     * @returns The serialized string representation of the control flow node.
     */
    serialize() {
        let result = this.indicator.serialize()

        for (const node of this.consequent) {
            result += ` ${node.serialize()}`
        }

        return result
    }
}

/**
 * Represents a program node in the AST.
 */
export class ProgramNode extends BaseNode<NodeType.Program, BaseNode[]> {
    /**
     * Creates a new instance of the ProgramNode class.
     * @param nodes The nodes contained in the program.
     */
    constructor(nodes: BaseNode[]) {
        super(NodeType.Program, nodes, false)
    }

    /**
     * Adds one or more nodes to the beginning of the program.
     * @param nodes The nodes to add to the program.
     */
    unshift(...nodes: BaseNode[]) {
        this.value.unshift(...nodes)
    }

    /**
     * Adds one or more nodes to the program.
     * @param nodes The nodes to be added.
     */
    push(...nodes: BaseNode[]) {
        this.value.push(...nodes);
    }

    /**
     * Gets the nodes of the program.
     * @returns An array of BaseNode objects.
     */
    get nodes() {
        return this.value
    }

    /**
     * Serializes the program node and its child nodes into a string representation.
     * @returns The serialized string representation of the program node.
     */
    serialize() {
        return this.nodes.map((node) => {
            const serialized = node.serialize()
            return node.semicolon ? `${serialized};` : serialized
        }).join("\n")
    }
}