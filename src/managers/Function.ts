import { AdvancedCollection } from 'nekord-collection'
import { BaseFunction } from '../structures/Function'
import { AddProperty } from '../structures/Data'
import { readdir } from 'fs/promises'
import { join } from 'path'

export class FunctionManager extends AdvancedCollection<string, BaseFunction> {
    #injections: Record<string, { name: string, target: string, data: BaseFunction }> = {}
    /**
     * Load all functions from the native core.
     * @param {string} dir Function directory.
     * @returns {Promise<void>}
     */
    async loadNatives() {
        const root = __dirname.replace('managers', 'functions'), files = await readdir(root)

        for (const file of files) {
            if (file.endsWith('.js')) {
                const func = require(join(root, file)).default
                if (func instanceof BaseFunction) {
                    const name = (
                        file.startsWith('$') 
                            ? file.slice(1, -3)
                            : file.slice(0, -3)
                        ).toLowerCase()

                    this.set(
                        name,
                        func
                    )
                }
            }
        }

    }

    /**
     * Adds a function into the manager.
     * @param data - Array of functions.
     * @returns {FunctionManager}
     */
    add(...data: AddProperty<BaseFunction, 'name', string>[]) {
        for (const func of data) {
            const name = func.name.toLowerCase(), body = func as BaseFunction
            this.set(name.startsWith('$') ? name.slice(1) : name, body)
        }
        return this
    }

    /**
     * Inject a subfunction into a function.
     * @param target - Function name where the function will be injected in.
     * @param name - Name of the function to be injected.
     * @param data - Data of the function to be injected.
     * @returns {FunctionManager}
     */
    inject(target: string, name: string, data: BaseFunction) {
        this.#injections[
            name.startsWith('$') 
                ? name.slice(1).toLowerCase() 
                : name.toLowerCase()
        ] = {
            data,
            name: name.startsWith('$') 
                ? name.slice(1).toLowerCase() 
                : name.toLowerCase(),
            target: target.startsWith('$') 
                ? target.slice(1).toLowerCase() 
                : target.toLowerCase()
        }
        return this
    }

    /**
     * Get all cached function injects.
     */
    get injections() {
        return this.#injections
    }
}