import { BaseEvent } from '../structures/Event'
import { BDJSLog } from '../util/BDJSLog'
import { Data } from '../structures/Data'
import { inspect } from 'util'

export default new BaseEvent<[Error]>({
    name: 'onError',
    description: 'Executed when an error is emitted.',
    async listener(bot, error) {
        BDJSLog.error(inspect(error, { depth: 5 }))

        if (bot.extraOptions.events.includes('onError')) {
            const commands = bot.commands.filter(cmd => cmd.type === 'error')
            const data = new Data({
                bot,
                commandType: 'error',
                env: {
                    error
                },
                functions: bot.functions,
                instanceTime: new Date,
                reader: bot.reader
            })

            for (const command of commands) {
                await data.reader.compile(command.code, data)
            }
        }
        
    }
})