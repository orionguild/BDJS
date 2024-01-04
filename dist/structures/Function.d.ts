import { Data } from './Data';
export interface BaseFieldOptions {
    /**
     * The field name.
     */
    name: string;
    /**
     * The field description.
     */
    description: string;
    /**
     * Mark as required or not.
     */
    required: boolean;
    /**
     * Default value for this field.
     */
    value: string;
    /**
     * Tell the compiler to resolve this field or not.
     */
    compile?: boolean;
    /**
     * Tell the compiler to unescape this field or not.
     */
    unescape?: boolean;
    /**
     * Tell the compiler what kind of type resolver should be applied.
     */
    resolver?: string;
    /**
     * Tell the compiler to take this parameter as rest.
     */
    rest?: boolean;
}
export interface BaseFunction {
    /**
     * Whether function support builder functions.
     */
    builders?: boolean;
    /**
     * Whether function is subfunction-injectable.
     */
    injectable?: boolean;
    /**
     * Description for this function.
    */
    description: string;
    /**
     * Field specifications for this function.
     */
    parameters?: BaseFieldOptions[];
    code: (d: Data, args: string[]) => Promise<any>;
}
export declare class BaseFunction implements BaseFunction {
    constructor(options: BaseFunction);
}
