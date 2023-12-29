import { RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import { Bot } from '../structures/Bot';
export declare class BDJSApplicationCommandManager {
    #private;
    constructor(bot: Bot);
    /**
     * Upload slash command specifications to the Discord API.
     * @param dir - Command specifications directory.
     * @param providing_cwd - Mark as "true" if your path provides a custom cwd.
     */
    load(dir: string, providing_cwd?: boolean): Promise<void>;
    /**
     * Upload all specifications to the Discord API.
     * @param guildIDs - Array of Guild IDs.
     */
    sync(guildIDs: string[] | undefined): Promise<void>;
    /**
     * Returns the number of cached specifications.
     */
    get commandSize(): number;
    /**
     * Returns all cached command sepecifications.
     */
    get commandsArray(): RESTPostAPIApplicationCommandsJSONBody[];
}
