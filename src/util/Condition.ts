const fullSymbols = [
    '>=',
    '<=',
    '==',
    '!=',
    '>',
    '<'
]

/**
 * Represents a condition parser.
 */
export class Condition {
    static evaluate(text: string): boolean {
        let results = {
            ands: [] as boolean[],
            ors: [] as boolean[]
        }
        const ands = text.split('&&').map(x => x.trim())

        for (const and of ands) {
            const ors = and.split('||').map(x => x.trim())

            for (const or of ors) {
                let [left, operator, right] = or.split(new RegExp(`(${fullSymbols.join('|')})`, 'ig')).map(t => t.trim())
                if (!operator) operator = '==', right = left

                switch (operator) {
                    case '==':
                        results.ors.push(
                            left == right
                        )
                        break
                    case '!=':
                        results.ors.push(
                            left != right
                        )
                        break
                    case '>=':
                        results.ors.push(
                            Number(left) >= Number(right)
                        )
                        break
                    case '<=':
                        results.ors.push(
                            Number(left) <= Number(right)
                        )
                        break
                    case '>':
                        results.ors.push(
                            Number(left) > Number(right)
                        )
                        break
                    case '<':
                        results.ors.push(
                            Number(left) < Number(right)
                        )
                        break
                }
            }

            results.ands.push(
                results.ors.some(x => x === true)
            )
            results.ors.length = 0
        }

        return results.ands.every(x => x === true)
    }
}