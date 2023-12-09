import { BaseEvent } from '../structures/Event'
import { Log } from '../util/Log'

export default new BaseEvent<[Error]>({
    name: 'onError',
    description: 'Executed when an error is emitted.',
    async listener(bot, error) {
        Log.error(
            JSON.stringify(error, null, 4)
        )
    }
})