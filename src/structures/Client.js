const { Client } = require('discord.js')
const { FunctionManager } = require('../managers/Function')

class Bot extends Client {
    /**
     * @param {import('../index').BotOptions} options - BDJS Client options.
     */
    constructor(options) {
        /**
         * @type {import('../index').BotOptions}
         */
        this.extraOptions = options
        /**
         * @type {FunctionManager}
         */
        this.functions = new FunctionManager
    }

    /**
     * Let the client login into the Discord Gateway.
     * @returns {Promise<string>}
     */
    async login() {
        await this.functions.load(__dirname.replace('structures', 'functions'), true)
        return super.login(this.extraOptions.auth)
    }
}

module.exports = { Bot }