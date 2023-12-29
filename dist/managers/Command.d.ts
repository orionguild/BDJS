import { Bot, SlashCommandBuilder, StringCommandTypes } from '../index';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
export interface CommandData {
    _path_?: string;
    data?: SlashCommandBuilder | RESTPostAPIApplicationCommandsJSONBody;
    name?: string;
    aliases?: string[];
    type: StringCommandTypes;
    code: string;
    [key: string]: unknown;
}
export declare class CommandManager extends Map<string, CommandData> {
    #private;
    /**
     * Add a commands into the manager.
     * @param commands - Array of commands.
     * @returns {CommandManager}
     */
    add(...commands: CommandData[]): this;
    /**
     * Load all commands inside a directory.
     * @param dir - Commands directory.
     * @param providing_cwd - Set to "true" if your directory provides a custom cwd.
     * @param log - BDJSLog commands.
     */
    load(dir: string, providing_cwd?: boolean, log?: boolean): Promise<void>;
    /**
     * Reload commands from source.
     * @param bot - BDJS client.
     * @returns {Promise<void>}
     */
    reload(bot: Bot): Promise<void>;
    /**
     * Return all valid command types.
     */
    get types(): StringCommandTypes[];
}
