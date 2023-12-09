import { AdvancedCollection } from 'nekord-collection'
import { BaseEvent } from '../structures/Event'
import { lstat, readdir } from 'fs/promises'
import { Bot } from '../structures/Bot'
import { Log } from '../util/Log'
import { join } from 'path'

export class EventManager extends AdvancedCollection<string, BaseEvent<any>> {
    async load(bot: Bot) {
        const root = __dirname.replace('managers', 'events')
        const files = await readdir(root)

        for (const file of files) {
            if (file.endsWith('.js')) {
                if (file === 'error.js') continue
                const event = require(join(root, file)).default as BaseEvent<any>
                if (
                    event instanceof BaseEvent
                    &&
                    bot.extraOptions.events.toString().includes(event.name)
                ) {
                    bot[event.once === true ? 'once' : 'on'](event.name, async (...args) => {
                        await event.listener(bot, ...args)
                    })
                }
            }
        }

    }
}