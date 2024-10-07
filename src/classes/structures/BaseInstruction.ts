import { Transpiler } from '@core/Transpiler'
import { BaseCompetence } from 'akore'

/**
 * Represents the field definition of a instruction.
 */
export interface InstructionField {
    name: string
    description: string
    type: DataType
    required: boolean
    rest?: boolean
}

/**
 * Represents the type of a value.
 */
export enum DataType {
    Boolean,
    Number,
    String,
    Unknown
}

/**
 * Represents a BDJS base instruction.
 */
export abstract class BaseInstruction extends BaseCompetence<Transpiler> {
    abstract description: string
    abstract fields: InstructionField[] | null
    abstract returns: DataType | null
    abstract version?: string
}