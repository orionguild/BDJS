import { BDJSApplicationCommandManager } from '../managers/ApplicationCommand'
import { Client, ClientEvents, ClientOptions } from 'discord.js'
import { FunctionManager } from '../managers/Function'
import { CommandManager } from '../managers/Command'
import { StatusManager } from '../managers/Status'
import { EventManager } from '../managers/Event'
import { DataBaseOptions } from 'collie-db'
import { StringEventNames } from '../index'
import { Reader } from '../core/Reader'
import { Log } from '../util/Log'

/**
 * Convert BDJS names into RAW discord.js client.
 * @param names - Client events.
 * @param type - Reformulation type.
 * @returns {string[]}
 */
export function reformulateEvents(
    names: string[],
    type: 'BDJS' | 'DJS' = 'BDJS'
) {
    names = [...names]
    for (let i = 0; i < names.length; i++) {
        if (type === 'BDJS')
            names[i] = 'on' + names[i][0].toUpperCase() + names[i].slice(1)
        else if (type === 'DJS')
            names[i] = names[i].toLowerCase().slice(2,1) + names[i][2].toLowerCase() + names[i].slice(3)
    }
    return names
}

export interface BDJSOptions extends ClientOptions {
    auth: `${string}.${string}.${string}`
    autoUpdate?: boolean
    database?: DataBaseOptions
    disableLogs?: boolean
    events: StringEventNames[]
    pointErrorsTo?: 'stdout' | 'discord'
    prefixes: string[]
    replyBots?: boolean
}

/**
 * Represents a BDJS client.
 */
export class Bot extends Client<true> {
    public appManager = new BDJSApplicationCommandManager(this)
    public commands = new CommandManager
    public events = new EventManager
    public functions = new FunctionManager
    public reader = new Reader
    public status = new StatusManager(this)
    public extraOptions: BDJSOptions
    constructor(options: BDJSOptions) {
        super(options)
        this.extraOptions = options

        // Prefix validation
        if (options.prefixes.length === 0)
            Log.error('Provide 1 prefix at least!'), process.exit()
    }

    /**
     * Login the BDJS client into the Discord Gateway.
     * @returns {Promise<string>}
     */
    override async login() {
        // Error handler.
        this.on('error', error => require('../events/error').default.listener(this, error))

        // Loading core.
        await this.functions.load()
        await this.events.load(this)
        return await super.login(
            this.extraOptions.auth
        )
    }
}