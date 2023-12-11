import { inspect } from 'util'
import { BaseEvent } from '../structures/Event'
import { BDJSLog } from '../util/BDJSLog'

export default new BaseEvent<[Error]>({
    name: 'onError',
    description: 'Executed when an error is emitted.',
    async listener(bot, error) {
        BDJSLog.error(inspect(error, { depth: 5 }))
    }
})