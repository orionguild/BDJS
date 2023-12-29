import { BaseFunction } from '../structures/Function';
import { AddProperty } from '../structures/Data';
export declare class FunctionManager extends Map<string, BaseFunction> {
    #private;
    /**
     * Load all functions from the native core.
     * @param {string} dir Function directory.
     * @returns {Promise<void>}
     */
    loadNatives(): Promise<void>;
    /**
     * Adds a function into the manager.
     * @param data - Array of functions.
     * @returns {FunctionManager}
     */
    add(...data: AddProperty<BaseFunction, 'name', string>[]): this;
    /**
     * Inject a subfunction into a function.
     * @param target - Function name where the function will be injected in.
     * @param name - Name of the function to be injected.
     * @param data - Data of the function to be injected.
     * @returns {FunctionManager}
     */
    inject(target: string, name: string, data: BaseFunction): this;
    /**
     * Get all cached function injects.
     */
    get injections(): Record<string, {
        name: string;
        target: string;
        data: BaseFunction;
    }>;
}
