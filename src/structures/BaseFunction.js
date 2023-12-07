/**
 * @typedef BaseFieldOptions
 * @property {string} name - The field name.
 * @property {string} description - The field description.
 * @property {boolean} required - Mark this field as required or not.
 * @property {string} value - The default value for the current field.
 * @property {?boolean} compile - Tell the compiler to resolve this field or not.
 * @property {?boolean} unescape - Tell the compiler to unescape this field or not.
 * @property {?string} resolver - Tell the compiler what kind of type resolver should be applied.
 * 
 * @typedef BaseFunctionOptions
 * @property {string} name - The function name.
 * @property {?BaseFieldOptions[]} parameters - Field specifications for this function.
 */

class BaseFunction {
    /**
     * Function options.
     * @param {BaseFunctionOptions} options 
     */
    constructor(options) {
        for (const property in options) {
            this[property] = options[property]
        }
    }

    /**
     * The code for this function.
     * @param {function(import('./Data.js').Data): Promise<any>} callback 
     */
    execute(callback) {
        this.run = callback
        return this
    }
}

module.exports = { BaseFunction }