import { BDJSApplicationCommandManager } from '../managers/ApplicationCommand';
import { Client, ClientOptions } from 'discord.js';
import { FunctionManager } from '../managers/Function';
import { VariableManager } from '../managers/Variable';
import DataBase, { DataBaseOptions } from 'collie-db';
import { CommandManager } from '../managers/Command';
import { StatusManager } from '../managers/Status';
import { EventManager } from '../managers/Event';
import { StringEventNames } from '../index';
import { Reader } from '../core/Reader';
import { Plugin } from './Plugin';
/**
 * Convert BDJS names into RAW discord.js client.
 * @param names - Client events.
 * @param type - Reformulation type.
 * @returns {string[]}
 */
export declare function reformulateEvents(names: string[], type?: 'BDJS' | 'DJS'): string[];
export interface BDJSOptions extends ClientOptions {
    auth: `${string}.${string}.${string}`;
    autoUpdate?: boolean;
    database?: DataBaseOptions;
    disableLogs?: boolean;
    debug?: boolean;
    events: StringEventNames[];
    mentionPrefix?: boolean;
    plugins?: Plugin[];
    prefixes: string[];
    replyBots?: boolean;
}
/**
 * Represents a BDJS client.
 */
export declare class Bot<T = DataBase> extends Client<true> {
    appManager: BDJSApplicationCommandManager;
    commands: CommandManager;
    events: EventManager;
    functions: FunctionManager;
    reader: Reader;
    status: StatusManager;
    extraOptions: BDJSOptions;
    db: any | null;
    vars: VariableManager | null;
    constructor(options: BDJSOptions);
    /**
     * Load variables into the client.
     * @param data - Variable records.
     * @param {string} [table="main"] - Table name.
     * @returns {VariableManager}
     */
    variables(data: Record<string, any>, table?: string): VariableManager<DataBase> | undefined;
    /**
     * Login the BDJS client into the Discord Gateway.
     * @returns {Promise<string>}
     */
    login(): Promise<string>;
}
