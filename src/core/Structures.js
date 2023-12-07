/**
 * Represents a BDJS function field value.
 */
class FunctionField {
    /**
     * Set the values for this field.
     * @param {number} index - Field index.
     * @param {?string} value - Field value.
     */
    constructor(index, value) {
        /**
         * Represents the index for this field.
         * @type {number}
         */
        this.index = index

        /**
         * Represents the value for this field.
         * @type {string}
         */
        this.value = value ?? ''
    }

    /**
     * Overwrites the value of this field.
     * @param {string} value - The new value.
     * @returns {FunctionField}
     */
    overwrite(value) {
        this.value = value
        return this
    }

    /**
     * Returns the value as string.
     * @returns {string}
     */
    toString() {
        return typeof this.value === undefined
            ? 'undefined' : typeof this.value === 'number'
                ? this.value.toString() : typeof this.value === 'object'
                    ? JSON.stringify(this.value) : typeof this.value === 'boolean'
                        ? this.value.toString() : this.value
    }

    /**
     * Writes a character into the field value.
     * @param {string} char - The character to write.
     * @returns {FunctionField}
     */
    write(char) {
        this.value += char
        return this
    }
}

/**
 * Represents a readed BDJS function.
 * @class
 * @constructor
 * @public
 */
class RawFunction {
    /**
     * The name of this function.
     * @type {string}
     * @private
     */
    #name = ''
    /**
     * Fields that belongs to this funcions.
     * @type {FunctionField[]}
     * @private
     */
    #fields = []
    /**
     * Marks this function as closed or not.
     * @type {boolean}
     * @private
     */
    #closed = false
    /**
     * Function index.
     * @type {number}
     * @private
     */
    #index = 0
    /**
     * Function line.
     * @type {number}
     */
    #line = 1

    /**
     * Add a new field to this function.
     * @param {string} value - The parameter value.
     * @returns {RawFunction}
     */
    addField(value) {
        const field = new FunctionField(this.#fields.length, value)
        this.#fields.push(field)
        return this
    }

    /**
     * Set the function as closed or not.
     * @param {boolean} closed - <bool>
     * @returns {RawFunction}
     */
    setClosed(closed) {
        this.#closed = closed
        return this
    }

    /**
     * Set the index for this function.
     * @param {number} index - Function index.
     * @returns {RawFunction}
     */
    setIndex(index) {
        this.#index = index
        return this
    }

    /**
     * Set the line where the function is on.
     * @param {number} index - Function line.
     * @returns {RawFunction}
     */
    setLine(index) {
        this.#line = index
        return this
    }

    /**
     * Set the name for this function.
     * @param {string} name - The function name.
     * @returns {RawFunction}
     */
    setName(name) {
        this.#name = name
        return this
    }

    /**
     * Return the function fields.
     */
    get fields() {
        return this.#fields
    }

    /**
     * Return the function index.
     */
    get index() {
        return this.#index
    }

    /**
     * Return wether this function is closed or not.
     */
    get isClosed() {
        return this.#closed
    }

    /**
     * Get the function name.
     */
    get name() {
        return this.#name
    }

    /**
     * Joins the function fields.
     */
    get stringFields() {
        return this.#fields.map(f => f.value).join(';')
    }

    /**
     * Get the compiled function as raw source.
     */
    get toString() {
        return this.#name + (this.#fields.length === 0 ? '' : ('[' + this.#fields.map(f => f.value) + ']'))
    }
}

class RawString {
    /**
     * Represents the value for this string.
     * @type {string}
     */
    #value = ''

    /**
     * Overwrites the value of this string.
     * @param {string} value - The new value.
     * @returns {RawString}
     */
    overwrite(value) {
        this.#value = value
        return this
    }

    /**
     * Writes a character into the string value.
     * @param {string} char - The character to write.
     * @returns {FunctionField}
     */
    write(char) {
        this.#value += char
        return this
    }

    /**
     * Check if the string value is empty.
     */
    get isEmpty() {
        return this.#value === ''
    }

    /**
     * Return the string value.
     */
    get value() {
        return this.#value
    }
}

module.exports = { RawFunction, RawString }