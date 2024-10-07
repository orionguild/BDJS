import { FunctionManager } from '../managers/Function';
import { CommandData, StringCommandTypes } from '../index';
import { CompiledData, Reader } from '../core/Reader';
import { CellParser } from '../core/CellParser';
import { Condition } from '../util/Condition';
import { BDJSLog } from '../util/BDJSLog';
import { BaseFunction } from './Function';
import { Container } from './Container';
import { Context } from './Context';
import { Util } from '../util/Util';
import { Bot } from './Bot';
interface DataOptions {
    /** BDJS client instance. */
    bot?: Bot;
    /** Command that is being executed. */
    command?: CommandData;
    /** Environment variable cache. */
    env?: Record<string, any>;
    /** Function manager. */
    functions?: FunctionManager;
    /** The current command type for this instance. */
    commandType: StringCommandTypes;
    /** BDJS reader. */
    reader: Reader;
    /** Discord context. */
    ctx?: Context<any>;
    /** Payload container. */
    container?: Container;
}
export type IterableFunctions = IterableIterator<readonly [string, BaseFunction]>;
export declare class Data {
    bot?: Bot;
    code: string;
    condition: typeof Condition;
    command?: CommandData;
    ctx?: Context<any>;
    env: Record<string, any>;
    functions: FunctionManager;
    function?: BaseFunction & {
        name: string;
    };
    commandType: StringCommandTypes;
    compiled: CompiledData & Record<string, any>;
    container: Container;
    reader: Reader;
    stop: boolean;
    cells: typeof CellParser;
    util: typeof Util;
    error: typeof BDJSLog;
    constructor(options: DataOptions);
    /**
     * Deletes a environment variable from the cache.
     * @param {string} name - The variable name.
     * @returns {Data}
     */
    deleteEnvironmentVariable(name: string): this;
    /**
     * Extends a parent data.
     * @param options - Data options to inherit.
     * @returns {Data}
     */
    extend(options: Data): Data;
    /**
     * Get a environment variable from the cache.
     * @param {string} name - The variable name.
     * @returns {unknown | undefined}
     */
    getEnvironmentVariable(name: string): any;
    /**
     * Check if the variable name exists in the cache.
     * @param {string} name - The variable name.
     * @returns {boolean}
     */
    hasEnvironmentVariable(name: string): boolean;
    /**
     * Set a environment variable in the cache.
     * @param {string} name - The variable name.
     * @param {unknown} value - The variable value.
     * @returns {Data}
     */
    setEnvironmentVariable(name: string, value: unknown): this;
    /**
     * Set the data result.
     * @param {string} text The compiled string result.
     * @returns {Data}
     */
    setCode(text: string): this;
}
export {};
