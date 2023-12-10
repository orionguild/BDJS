import { Data } from '../structures/Data'
import clc from 'cli-color'

type ErrorTypes = 'client' | 'command' | 'custom' | 'disallowed' | 'internal' | 'invalid' | 'required'

export class Log extends Error {
    name = ''
    constructor(d: Data, type: ErrorTypes, ...args: string[] | undefined[]) {
        let message: string

        switch (type) {
            case 'client':
                message = `🤖 ${clc.blue('BDJS') + ':' + clc.blue('CLIENT')} | ${args.join(' ')}`
                break
            case 'custom':
                message = `🤖 ${clc.blue('BDJS') + ':' + clc.white('CUSTOM')} | ${args.join(' ')}`
                break
            case 'command':
                message = `ℹ  ${clc.blue('BDJS') + ':' + clc.magenta('COMMAND')} | ${args[0]} at ${args[1]}`
                break
            case 'disallowed':
                message = `❌ ${clc.blue('BDJS') + ':' + clc.red('DISALLOWED')} | ${args[0]} is only allowed in ${args[1]}`
                break
            case 'internal':
                message = `⚠️ ${clc.blue('BDJS') + ':' + clc.yellowBright('INTERNAL')} | ${args.join(' ')}`
                break
            case 'invalid':
                message = `❌ ${clc.blue('BDJS') + ':' + clc.red('ERROR')} | Invalid ${args[0]} in ${args[1]}`
                break
            case 'required':
                message = `❌ ${clc.blue('BDJS') + ':' + clc.red('ERROR')} | "${args[0]}" is required in ${args[1]}`
                break
        }

        super(message)

    }

    /**
     * Log a colored error message into the console.
     * @param message - The error message.
     * @returns {void}
     */
    static error(message: string) {
        console.log(
            '❌',
            `${clc.blue('BDJS') + ':' + clc.red('ERROR')}`,
            '|',
            clc.magentaBright(message)
        )
    }

    /**
     * Log a colored information message into the console.
     * @param message - The information message.
     * @returns {void}
     */
    static info(message: string) {
        console.log(
            'ℹ',
            `${clc.blue('BDJS') + ':' + clc.cyan('INFO')}`,
            '|',
            clc.green(message)
        )
    }

    /**
     * Log a colored warning message into the console.
     * @param message - The warning message.
     * @returns {void}
     */
    static warn(message: string) {
        console.log(
            '⚠️ ',
            `${clc.blue('BDJS') + ':' + clc.yellowBright('WARN')}`,
            '|',
            clc.yellow(message)
        )
    }

    /**
     * Log a colored debug message into the console.
     * @param message - The debug message.
     * @returns {void}
     */
    static debug(message: string) {
        console.log(
            '🐛',
            `${clc.blue('BDJS') + ':' + clc.cyan('DEBUG')}`,
            '|',
            clc.blue(message)
        )
    }
}
