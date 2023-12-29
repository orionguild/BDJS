"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFunction = void 0;
class BaseFunction {
    constructor(options) {
        this.builders = options.builders ?? false;
        this.injectable = options.injectable ?? false;
        this.description = options.description;
        this.parameters = options.parameters ?? [];
        this.code = options.code;
    }
}
exports.BaseFunction = BaseFunction;
