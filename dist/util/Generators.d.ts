import { BaseFieldOptions } from '../structures/Function';
interface FunctionExtraOptions {
    /** If function supports builders. */
    builders: boolean;
    /** If function supports injection. */
    injection: boolean;
    /** Function parameters, if any. */
    params: BaseFieldOptions[];
}
/**
 * Represents a function documentation.
 */
declare class FunctionInfo {
    name: string;
    description: string;
    extraOptions: FunctionExtraOptions;
    constructor(name: string, description: string, extraOptions: FunctionExtraOptions);
    /**
     * Returns the parameter table as string.
     */
    getParamTable(): string;
    /**
     * Get the function source.
     */
    getSource(): Promise<string | null>;
    /**
     * Generates a markdown file from function data.
     */
    toMD(): Promise<string>;
    /**
     * Returns the function URL.
     */
    get url(): string;
    /**
     * Get the function usage as string.
     */
    get usage(): string;
}
/**
 * All BDJS documentation generator toolsets.
 */
export declare class Generators {
    /**
     * Read functions and load its metadata.
     * @param input - Function path.
     * @param input_providing_cwd - Whether input includes a custom cwd.
     */
    static loadFunctions(input: string, input_providing_cwd?: boolean): Promise<FunctionInfo[]>;
    /**
     * Generates documentation of every BDJS function.
     * @param input - Input directory for reading functions.
     * @param output - Ouput directory for markdown files.
     */
    static documentFunctions(input: string, output: string): Promise<void>;
    /**
     * Generates a JSON file including all functions.
     * @param output - JSON file output directory.
     */
    static getFunctionSchema(accumulated: FunctionInfo[], output: string): Promise<void>;
    /**
     * Generates the documentation sidebar.
     * @param accumulated - Array of loaded functions.
     * @param output - Output directory.
     * @param providing_cwd - Whether output includes a custom cwd.
     */
    static getSideBar(accumulated: FunctionInfo[], output: string): Promise<void>;
    /**
     * Generates a markdown file including all supported command types as table.
     * @param output - Markdown file output directory.
     */
    static getCommandTypeTable(output: string): Promise<void>;
    /**
     * Generates a markdown file including all supported events as table.
     * @param output - Markdown file output directory.
     */
    static getEventTable(output: string): Promise<void>;
    /**
     * Generates a JSON file including all functions.
     * @param output - JSON file output directory.
     */
    static getEventSchema(output: string): Promise<void>;
    static getPropertiesTable(output: string): Promise<void>;
}
export {};
