import { ContextMenuCommandBuilder, Collection, RESTPostAPIApplicationCommandsJSONBody, SlashCommandBuilder } from 'discord.js'
import { lstat, readdir } from 'fs/promises'
import { Bot } from '../structures/Bot'
import { BDJSLog } from '../util/BDJSLog'
import { join } from 'path'
import { CommandData } from './Command'

interface ExtendedCommandData extends CommandData {
    data?: ContextMenuCommandBuilder | SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody
}

export class BDJSApplicationCommandManager {
    #bot: Bot
    #commands: Collection<string, RESTPostAPIApplicationCommandsJSONBody>
    constructor(bot: Bot) {
        this.#bot = bot
        this.#commands = new Collection
    }

    /**
     * Upload slash command specifications to the Discord API.
     * @param dir - Command specifications directory.
     * @param providing_cwd - Mark as "true" if your path provides a custom cwd.
     */
    async load(dir: string, providing_cwd = false) {
        const root = providing_cwd ? '' : process.cwd()
        const files = await readdir(join(root, dir))

        for (const file of files) {
            const stat = await lstat(join(root, dir, file))
            if (stat.isDirectory()) {
                await this.load(join(dir, file), providing_cwd)
                continue
            }

            const spec: ExtendedCommandData | ExtendedCommandData[] = require(join(root, dir, file))
            if (!Array.isArray(spec)) this.#commands.set(
                spec.data!.name,
                spec.data instanceof SlashCommandBuilder || spec.data instanceof ContextMenuCommandBuilder
                    ? spec.data!.toJSON() : spec.data!
            )
            else {
                for (const cmd of spec) {
                    if (!('data' in cmd)) continue
                    this.#commands.set(
                        cmd.data!.name,
                        cmd.data instanceof SlashCommandBuilder || cmd.data instanceof ContextMenuCommandBuilder
                            ? cmd.data!.toJSON() : cmd.data!
                    )
                }
            }
            delete require.cache[join(root, dir, file)]
        }

    }

    /**
     * Upload all specifications to the Discord API.
     * @param guildIDs - Array of Guild IDs.
     */
    async sync(guildIDs: string[] | undefined) {
        if (Array.isArray(guildIDs)) {
            for (const guildID of guildIDs) {
                const guild = this.#bot.guilds.cache.get(guildID) ?? await this.#bot.guilds.fetch(guildID)
                if (!guild) {
                    BDJSLog.error('Cannot sync command specifications to "' + guildID + '"')
                    continue
                }
                await guild.commands.set(this.commandsArray).catch(e => {
                    BDJSLog.error(JSON.stringify(e, null, 4))
                })
            }
        } else if (typeof guildIDs === 'undefined') {
            await this.#bot.application.commands.set(this.commandsArray).catch(e => {
                BDJSLog.error(JSON.stringify(e, null, 4))
            })
        }
    }

    /**
     * Returns the number of cached specifications.
     */
    get commandSize() {
        return this.#commands.size
    }

    /**
     * Returns all cached command sepecifications.
     */
    get commandsArray() {
        return Array.from(this.#commands.values())
    }
}