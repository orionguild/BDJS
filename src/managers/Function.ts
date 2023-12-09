import { BaseFunction } from '../structures/Function'
import { AdvancedCollection } from 'nekord-collection'
import { readdir } from 'fs/promises'
import { join } from 'path'

export class FunctionManager extends AdvancedCollection<string, BaseFunction> {
    /**
     * Load all functions from the native core.
     * @param {string} dir Function directory.
     * @returns {Promise<void>}
     */
    async load() {
        const root = __dirname.replace('managers', 'functions'), files = await readdir(root)

        for (const file of files) {
            if (file.endsWith('.js')) {
                const func = require(join(root, file)).default
                if (func instanceof BaseFunction) {
                    const name = (
                        file.startsWith('$') 
                            ? file.slice(1, -3)
                            : file.slice(0, -3)
                        ).toUpperCase()

                    this.set(
                        name,
                        func
                    )
                }
            }
        }

    }
}