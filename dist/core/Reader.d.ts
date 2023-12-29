import { Data } from '../structures/Data';
import { RawFunction, RawString } from './Structures';
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
}
