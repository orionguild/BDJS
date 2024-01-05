"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = void 0;
const fullSymbols = [
    '>=',
    '<=',
    '==',
    '!=',
    '>',
    '<'
];
/**
 * Represents a condition parser.
 */
class Condition {
    static evaluate(text) {
        const andResults = [];
        const ands = text.split('&&').map(x => x.trim());
        for (const and of ands) {
            const orResults = [];
            const ors = and.split('||').map(x => x.trim());
            for (const or of ors) {
                let [left, operator, right] = or.split(new RegExp(`(${fullSymbols.join('|')})`, 'ig')).map(t => t.trim());
                if (!operator)
                    operator = '==', right = left;
                switch (operator) {
                    case '==':
                        orResults.push(left == right);
                        break;
                    case '!=':
                        orResults.push(left != right);
                        break;
                    case '>=':
                        orResults.push(Number(left) >= Number(right));
                        break;
                    case '<=':
                        orResults.push(Number(left) <= Number(right));
                        break;
                    case '>':
                        orResults.push(Number(left) > Number(right));
                        break;
                    case '<':
                        orResults.push(Number(left) < Number(right));
                        break;
                }
            }
            andResults.push(orResults.some(x => x === true));
        }
        return andResults.every(x => x === true);
    }
}
exports.Condition = Condition;
