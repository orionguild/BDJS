/**
 * Represents a BDJS function field value.
 */
declare class FunctionField {
    index: number;
    value: string;
    constructor(index: number, value: string);
    /**
     * Overwrites the value of this field.
     * @param {string} value - The new value.
     * @returns {FunctionField}
     */
    overwrite(value: string): this;
    /**
     * Returns the value as string.
     * @returns {string}
     */
    toString(): string;
    /**
     * Writes a character into the field value.
     * @param {string} char - The character to write.
     * @returns {FunctionField}
     */
    write(char: string): this;
}
export declare class RawFunction {
    /**
     * The name of this function.
     * @type {string}
     * @private
     */
    name: string;
    /**
     * Fields that belongs to this funcions.
     * @type {FunctionField[]}
     * @private
     */
    fields: FunctionField[];
    /**
     * Marks this function as closed or not.
     * @type {boolean}
     * @private
     */
    closed: boolean;
    /**
     * Function index.
     * @type {number}
     * @private
     */
    index: number;
    /**
     * Function line.
     * @type {number}
     */
    line: number;
    /**
     * Add a new field to this function.
     * @param {string} value - The parameter value.
     * @returns {RawFunction}
     */
    addField(value: string): this;
    /**
     * Set the function as closed or not.
     * @param {boolean} closed - <bool>
     * @returns {RawFunction}
     */
    setClosed(closed: boolean): this;
    /**
     * Set the index for this function.
     * @param {number} index - Function index.
     * @returns {RawFunction}
     */
    setIndex(index: number): this;
    /**
     * Set the line where the function is on.
     * @param {number} index - Function line.
     * @returns {RawFunction}
     */
    setLine(index: number): this;
    /**
     * Set the name for this function.
     * @param {string} name - The function name.
     * @returns {RawFunction}
     */
    setName(name: string): this;
    /**
     * Return wether this function is closed or not.
     */
    get isClosed(): boolean;
    /**
     * Joins the function fields.
     */
    get stringFields(): string;
    /**
     * Get the compiled function as raw source.
     */
    get toString(): string;
}
export declare class RawString {
    /**
     * Represents the value for this string.
     * @type {string}
     */
    value: string;
    /**
     * Overwrites the value of this string.
     * @param {string} value - The new value.
     * @returns {RawString}
     */
    overwrite(value: string): this;
    /**
     * Writes a character into the string value.
     * @param {string} char - The character to write.
     * @returns {FunctionField}
     */
    write(char: string): this;
    /**
     * Check if the string value is empty.
     */
    get isEmpty(): boolean;
}
export {};
