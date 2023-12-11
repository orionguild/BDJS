import { Data } from '../structures/Data'

export class CellParser {
    static data: { name: string, value: string }[] = []
    static parse(text: string, cellName: string, value: string) {
        return text.replaceAll(`{${cellName.trim()}}`, value)
    }
}