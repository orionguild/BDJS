const { Util } = require('../utils/Util.js')

/**
 * BDJS environment data.
 */
class Data {
    /**
     * Data constructor options.
     * @param {import('../index.js').DataConstructor} options 
     */
    constructor(options) {
        this.client = options.client
        this.compiled = options.compiled ?? {}
        this.env = options.env ?? {}
        this.instanceTime = options.instanceTime ?? Date.now()
        this.commandType = options.commandType ?? 'unknown'
        /** @type {Util} */
        this.util = Util
    }

    /**
     * Deletes a environment variable from the cache.
     * @param {string} name - The variable name.
     * @returns {Data}
     */
    deleteEnvironmentVariable(name) {
        delete this.env[name]
        return this
    }

    /**
     * Get a environment variable from the cache.
     * @param {string} name - The variable name.
     * @returns {unknown | undefined}
     */
    getEnvironmentVariable(name) {
        return this.env[name]
    }

    /**
     * Check if the variable name exists in the cache.
     * @param {string} name - The variable name.
     * @returns {boolean}
     */
    hasEnvironmentVariable(name) {
        return name in this.env
    }

    /**
     * Set a environment variable in the cache.
     * @param {string} name - The variable name.
     * @param {unknown} value - The variable value.
     * @returns {Data}
     */
    setEnvironmentVariable(name, value) {
        this.env[name] = value
        return this
    }

    /**
     * Set the data result.
     * @param {string} text The compiled string result.
     * @returns {Data}
     */
    setCode(text) {
        this.code = text
        return this
    }
}

module.exports = { Data }