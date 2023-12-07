const { BaseEvent } = require('../structures/BaseEvent')

module.exports = new BaseEvent({
    name: 'ready'
}).execute(
    /**
     * @param {import('../structures/Client').Bot} bot 
     */
    async (bot) => {
        const commands = bot.commands
    }
)