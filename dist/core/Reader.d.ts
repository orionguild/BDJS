import { Data } from '../structures/Data';
import { RawFunction, RawString } from './Structures';
import { BaseFieldOptions } from '../structures/Function';
/**
 * Represents the compiled data by BDJS reader.
 */
export interface CompiledData {
    functions: RawFunction[];
    function: RawFunction;
    strings: RawString[];
    string: RawString;
    temp: RawString;
    depth: number;
    line: number;
    type: string;
}
/**
 * BDJS code reader.
 */
export declare class Reader {
    /**
     * Reads BDJS code.
     * @param {string} code BDJS code to read.
     * @param {Data} data Environment data.
     * @returns {Promise<Data>}
     */
    compile(code: string, data: Data): Promise<Data>;
    /**
     * Unescapes a function parameter.
     * @param self - The parameter value.
     * @param spec - Parameter specificaction.
     * @returns {string}
     */
    static unescapeParam(self: string, spec?: BaseFieldOptions): string;
}
