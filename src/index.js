const { BaseFunction } = require('./structures/BaseFunction.js')
const { Bot } = require('./structures/Client.js')
const { Data } = require('./structures/Data.js')

/**
 * @typedef BDJSExtraOptions
 * @property {string} auth - The autentication token.
 * @property {string[]} prefixes - Command prefixes for the bot to execute commands.
 * @property {?boolean} [guildOnly=true] - Mark commands as whether "guild-only" or not.
 * @property {?BDJSEvents[]} events - The events to be enabled and executed.
 * @property {?string[]} owners - Array of owner IDs.
 * @property {?boolean} autoUpdate - Enables or disables autoupdate system.
 * 
 * @typedef {import('discord.js').ClientOptions & BDJSExtraOptions} BotOptions
 * 
 * @typedef {'prefixed' | 'unprefixed' | 'ready' |'unknown'} CommandStringTypes
 * 
 * @typedef {import('discord.js').ClientEvents} BDJSEvents
 * 
 * @typedef DataConstructor
 * @property {import('../index').Bot} client - The BDJS client.
 * @property {?Record<string, any>} env - Environment cache.
 * @property {?number} instanceTime - The creation time for this instance.
 * @property {CommandStringTypes} commandType - The current command type.
 * @property {import('./core/Reader.js').CompiledData} compiled - Compiled data by the BDJS reader.
 * 
 * @typedef CommandData
 * @property {string} name - The command name.
 * @property {?CommandStringTypes} type - The command type.
 * @property {?string[]} aliases - Command aliases.
 * @property {string} code - The command code.
 * @property {Object.<string, any>} [extraOptions] - Represents any extra property.
 */

module.exports = {
    BaseFunction,
    Bot,
    Data
}