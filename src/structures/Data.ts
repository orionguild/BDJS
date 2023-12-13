import { FunctionManager } from '../managers/Function'
import { CommandData, StringCommandTypes } from '../index'
import { CompiledData, Reader } from '../core/Reader'
import { CellParser } from '../core/CellParser'
import { Condition } from '../util/Condition'
import { BDJSLog } from '../util/BDJSLog'
import { BaseFunction } from './Function'
import { Container } from './Container'
import { Context } from './Context'
import { Util } from '../util/Util'
import { Bot } from './Bot'

export type AddProperty<T, K extends string, V> = T & { [key in K]: V };

interface DataOptions {
    /** BDJS client instance. */
    bot?: Bot
    /** Command that is being executed. */
    command?: CommandData
    /** Environment variable cache. */
    env?: Record<string, any>
    /** Function manager. */
    functions?: FunctionManager
    /** The instance time for this data. */
    instanceTime?: Date
    /** The current command type for this instance. */
    commandType: StringCommandTypes
    /** BDJS reader. */
    reader: Reader
    /** Discord context. */
    context?: Context<any>
    /** Payload container. */
    container?: Container
}


export class Data {
    bot?: Bot
    code: string
    condition: typeof Condition
    command?: CommandData
    ctx?: Context<any>
    env: Record<string, any>
    functions: FunctionManager
    function?: AddProperty<BaseFunction, 'name', string>
    instanceTime?: Date
    commandType: StringCommandTypes
    compiled: CompiledData & Record<string, any>
    container: Container
    reader: Reader
    cells: typeof CellParser
    util: typeof Util
    error: typeof BDJSLog
    constructor(options: DataOptions) {
        this.bot = options.bot
        this.code = ''
        this.env = options.env ?? {}
        this.functions = options.bot?.functions ?? options.functions ?? new FunctionManager
        this.instanceTime = options.instanceTime ?? new Date
        this.commandType = options.commandType ?? 'unknown'
        this.compiled = {} as CompiledData
        this.function = {} as AddProperty<BaseFunction, 'name', string>
        this.container = options.container ?? new Container
        this.command = options.command
        this.ctx = options.context
        this.reader = options.reader ?? new Reader()
        this.condition = Condition
        this.cells = CellParser
        this.error = BDJSLog
        this.util = Util
    }

    /**
     * Deletes a environment variable from the cache.
     * @param {string} name - The variable name.
     * @returns {Data}
     */
    deleteEnvironmentVariable(name: string) {
        delete this.env[name]
        return this
    }

    /**
     * Extends a parent data.
     * @param options - Data options to inherit.
     * @returns {Data}
     */
    extend(options: DataOptions): Data {
        return new Data({ ...options })
    }

    /**
     * Get a environment variable from the cache.
     * @param {string} name - The variable name.
     * @returns {unknown | undefined}
     */
    getEnvironmentVariable(name: string) {
        return this.env[name]
    }

    /**
     * Check if the variable name exists in the cache.
     * @param {string} name - The variable name.
     * @returns {boolean}
     */
    hasEnvironmentVariable(name: string) {
        return name in this.env
    }

    /**
     * Set a environment variable in the cache.
     * @param {string} name - The variable name.
     * @param {unknown} value - The variable value.
     * @returns {Data}
     */
    setEnvironmentVariable(name: string, value: unknown) {
        this.env[name] = value
        return this
    }

    /**
     * Set the data result.
     * @param {string} text The compiled string result.
     * @returns {Data}
     */
    setCode(text: string) {
        this.code = text
        return this
    }
}