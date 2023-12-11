import { FunctionManager } from '../managers/Function'
import { EventManager } from '../managers/Event'
import { lstat, readdir } from 'fs/promises'
import { join } from 'path'
import { Bot } from './Bot'
import { BaseFunction } from './Function'
import { BaseEvent } from './Event'

/**
 * Represents a BDJS plugin.
 */
export class Plugin {
    public name: string
    public description: string
    public version: string
    public functionManager = new FunctionManager
    public eventManager = new EventManager
    constructor(data: { name: string, description: string, version: string}) {
        if (!data) throw new Error('Missing plugin metadata!')
        this.name = data.name
        this.description = data.description
        this.version = data.version
    }

    async load(dir: string, providing_cwd = false) {
        const root = providing_cwd ? '' : process.cwd()
        const files = await readdir(join(root, dir))
        for (const file of files) {
            const stat = await lstat(join(root, dir, file))
            if (stat.isDirectory()) {
                await this.load(join(dir, file), providing_cwd)
                continue
            } else if (!file.endsWith('.js')) continue

            const mod = require(join(root, dir, file)).default
            if (mod instanceof BaseFunction) {
                const name = file.slice(file.startsWith('$') ? 1 : 0, -3).toLowerCase()
                this.functionManager.set(name, mod)
            } else if (mod instanceof BaseEvent) {
                this.eventManager.set(mod.name, mod)
            }

        }
    }

    /**
     * Attach this plugin into the BDJS client.
     * @param bot - BDJS client.
     */
    __attach__(bot: Bot) {
        if (this.functionManager.size > 0) {
            this.functionManager.forEach((func, name) => {
                bot.functions.set(name, func)
            })
        }

        if (this.eventManager.size > 0) {
            this.eventManager.forEach((event, name) => {
                bot.on<any>(
                    name,
                    (...args) => event.listener(bot, ...args)
                )
            })
        }
    }
}