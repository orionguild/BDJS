import { Bot } from './Bot'

/**
 * Represents a BDJS plugin.
 */
export class Plugin {
    public name: string
    public description: string
    public version: string
    constructor() {
        this.name = ''
        this.description = ''
        this.version = ''
    }

    /**
     * Attach this plugin into the BDJS client.
     * @param bot - BDJS client.
     */
    attach(bot: Bot) {}
}