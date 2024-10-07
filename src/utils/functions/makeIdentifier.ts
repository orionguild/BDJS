import { BaseInstruction } from '@structures/BaseInstruction'

export default function (instruction: BaseInstruction) {
    return 'bdjs:' + instruction.patterns.foremost.source.replace(/\\\$/, '')
}