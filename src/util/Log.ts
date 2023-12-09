import clc from 'cli-color'

export class Log {
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
