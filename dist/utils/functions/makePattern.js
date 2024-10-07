"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
/**
 * Creates the patterns object of a BDJS instruction.
 * @param foremost - Foremost pattern of the instruction.
 * @param brackets - Whether function must include brackets.
 * @param inside - Specific "function inside" pattern.
 * @returns {Patterns}
 */
function default_1(foremost, brackets = true, inside) {
    return {
        foremost,
        opener: brackets ? /\[/ : undefined,
        closer: brackets ? /\]/ : undefined,
        inside: brackets && inside ? inside : undefined
    };
}
