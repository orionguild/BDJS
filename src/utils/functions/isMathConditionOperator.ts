/**
 * Check whether given operator is a math condition operator.
 * @param operator - Condition operator to be checked.
 * @returns {boolean}
 */
export default function (operator: string) {
    return ['>', '<', '<=', '>='].includes(operator)
}