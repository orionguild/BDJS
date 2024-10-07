"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInstruction = exports.DataType = void 0;
const akore_1 = require("akore");
/**
 * Represents the type of a value.
 */
var DataType;
(function (DataType) {
    DataType[DataType["Boolean"] = 0] = "Boolean";
    DataType[DataType["Number"] = 1] = "Number";
    DataType[DataType["String"] = 2] = "String";
    DataType[DataType["Unknown"] = 3] = "Unknown";
})(DataType || (exports.DataType = DataType = {}));
/**
 * Represents a BDJS base instruction.
 */
class BaseInstruction extends akore_1.BaseCompetence {
}
exports.BaseInstruction = BaseInstruction;
