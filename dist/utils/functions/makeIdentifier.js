"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(instruction) {
    return 'bdjs:' + instruction.patterns.foremost.source.replace(/\\\$/, '');
}
