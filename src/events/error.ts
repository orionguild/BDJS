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
                reader: bot.reader
            })

            data.functions.add({
                name: 'getError',
                description: 'Get an error prooerty.',
                code: async (d, [property]) => {
                    const properties = ['message', 'stack', 'raw']
                        if (!properties.includes(property.toLowerCase()))
                            throw new data.error(data, 'invalid', 'property', data.function?.name!)
                        
                        const err = inspect(property.toLowerCase() === 'raw' ? error : (error as any)[property], { depth: 4 })

                        return err
                }
            })

            for (const command of commands) {
                data.command = command
                await data.reader.compile(command.code, data)
            }
        }

    }
})