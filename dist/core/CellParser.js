"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellParser = void 0;
class CellParser {
    static parse(text, cellName, value) {
        return text.replaceAll(`{${cellName.trim()}}`, value);
    }
}
exports.CellParser = CellParser;
CellParser.data = [];
