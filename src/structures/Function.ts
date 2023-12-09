import { Data } from './Data'

interface BaseFieldOptions {
    /**
     * The field name.
     */
    name: string
    /**
     * The field description.
     */
    description: string
    /**
     * Mark as required or not.
     */
    required: boolean
    /**
     * Default value for this field.
     */
    value: string
    /**
     * Tell the compiler to resolve this field or not.
     */
    compile?: boolean
    /**
     * Tell the compiler to unescape this field or not.
     */
    unescape?: boolean
    /**
     * Tell the compiler what kind of type resolver should be applied.
     */
    resolver?: string
}

export interface BaseFunction {
    /**
     * Description for this function.
    */
    description: string
    /**
     * Field specifications for this function.
     */
    parameters?: BaseFieldOptions[]
    code: (d: Data, args: string[]) => Promise<any>
}

export class BaseFunction implements BaseFunction {
    constructor(options: BaseFunction) {
        this.description = options.description
        this.parameters = options.parameters ?? []
        this.code = options.code
    }
}