/**
 * @typedef BaseEventOptions
 * @property {import('discord.js').ClientEvents} name - The event name.
 */

class BaseEvent {
    /**
     * Event options.
     * @param {BaseEventsOptions} options 
     */
    constructor(options) {        
        for (const property in options) {
            this[property] = options[property]
        }
    }

    /**
     * The code for this event.
     */
    execute(callback) {
        this.run = callback
        return this
    }
}

module.exports = { BaseEvent }