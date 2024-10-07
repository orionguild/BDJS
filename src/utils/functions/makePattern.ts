import { Patterns } from 'akore'

/**
 * Creates the patterns object of a BDJS instruction.
 * @param foremost - Foremost pattern of the instruction.
 * @param brackets - Whether function must include brackets.
 * @param inside - Specific "function inside" pattern.
 * @returns {Patterns}
 */
export default function (foremost: RegExp, brackets = true, inside?: RegExp) {
    return <Patterns>{
        foremost,
        opener: brackets ? /\[/ : undefined,
        closer: brackets ? /\]/ : undefined,
        inside: brackets && inside ? inside : undefined
    }
}