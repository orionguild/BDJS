import getAllowedCommandKeys from "@functions/getAllowedCommandKeys"
import { Transpiler } from "@core/Transpiler"
import { minify } from "uglify-js"

export interface BaseCommandStructure<Types extends string = string> {
    /**
     * The name this command has.
     */
    name?: string
    /**
     * The aliases this command could have.
     */
    aliases?: string[]
    /**
     * The type of this command.
     */
    type: Types
    /**
     * The native code of this command.
     */
    code: string
    /**
     * User-defined data of the command.
     */
    additionalData?: Record<string, unknown>
    /**
     * Whether transpilation result should be an async function.
     */
    async?: boolean
    /**
     * Whether minify transpilation result.
     */
    minify?: boolean
    /**
     * The transpilation result of the command.
     */
    transpiled?: string
    /**
     * Specifies the command path.
     */
    path?: string
    /**
     * Whether command is reloadable.
     */
    reloadable?: boolean
}

/**
 * Represents the information about command transpilation
 * and other important stuff.
 */
interface CachedCommandStatus {
    success: boolean
    error?: Error
    warnings?: string[]
}

/**
 * Represents a formed command.
 */
export class FormedCommand {
    #status: CachedCommandStatus = {
        success: false
    }
    constructor(private data: BaseCommandStructure, private transpiler: Transpiler) {
        // Removing disallowed properties from the main command structure.
        for (const key of Object.keys(data)) {
            if (!getAllowedCommandKeys().includes(key)) {
                if (!data.additionalData) data.additionalData = {};
                data.additionalData[key] = (<Record<string, any>>data)[key]
                delete (<Record<string, any>>data)[key]
            }
        }

        // Transpilation process.
        let transpiled = transpiler.transpile(data.code)

        // Handle async option.
        if (data.async) transpiled = `(async () => {\n\t${transpiled}\n})();`;

        // Handle minification.
        if (data.minify) {
            const minified = minify(transpiled)
            this.#status.success = minified.error === undefined && minified.warnings === undefined
            
        }
    }
}