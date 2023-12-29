import { Data } from '../structures/Data';
type ErrorTypes = 'client' | 'command' | 'custom' | 'disallowed' | 'internal' | 'invalid' | 'required';
export declare class BDJSLog extends Error {
    name: string;
    message: string;
    constructor(d: Data, type: ErrorTypes, ...args: string[] | undefined[]);
    /**
     * BDJSLog a colored error message into the console.
     * @param message - The error message.
     * @returns {void}
     */
    static error(message: string): void;
    /**
     * BDJSLog a colored information message into the console.
     * @param message - The information message.
     * @returns {void}
     */
    static info(message: string): void;
    /**
     * BDJSLog a colored warning message into the console.
     * @param message - The warning message.
     * @returns {void}
     */
    static warn(message: string): void;
    /**
     * BDJSLog a colored debug message into the console.
     * @param message - The debug message.
     * @returns {void}
     */
    static debug(message: string): void;
}
export {};
