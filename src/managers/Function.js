const { BaseFunction } = require('../structures/BaseFunction.js')
const { AdvancedCollection } = require('nekord-collection')
const { lstat, readdir } = require('fs/promises')
const { cwd } = require('process')
const { join } = require('path')

/**
 * BDJS function manager.
 * @template {string} K
 * @template {BaseFunction} V
 * @extends AdvancedCollection<K,V>
 */
class FunctionManager extends AdvancedCollection {
    /**
     * Load all functions from the native core.
     * @param {string} dir Function directory.
     * @param {boolean} [includes_cwd=false] Mark the directory as "including cwd" or not.
     * @returns {Promise<void>}
     */
    async load(dir, includes_cwd = false) {
        const files = await readdir(join(includes_cwd === false ? cwd() : '', dir))

        for (const file of files) {
            const stat = await lstat(join(includes_cwd === false ? cwd() : '', dir, file))
            if (stat.isDirectory()) {
                await this.load(join(dir, file), includes_cwd)
            } else {
                const struct = require(join(includes_cwd === false ? cwd() : '', dir, file))
                if (struct instanceof BaseFunction) {
                    this.set(file.startsWith('$') ? file.slice(1, -3) : file.slice(0, -3), struct)
                }
            }
        }

    }
}

module.exports = { FunctionManager }