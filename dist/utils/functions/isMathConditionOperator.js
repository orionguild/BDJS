"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
/**
 * Check whether given operator is a math condition operator.
 * @param operator - Condition operator to be checked.
 * @returns {boolean}
 */
function default_1(operator) {
    return ['>', '<', '<=', '>='].includes(operator);
}
