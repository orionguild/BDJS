import { BDJSApplicationCommandManager } from '../managers/ApplicationCommand'
import { Client, ClientEvents, ClientOptions } from 'discord.js'
import { FunctionManager } from '../managers/Function'
import { VariableManager } from '../managers/Variable'
import { CommandManager } from '../managers/Command'
import { StatusManager } from '../managers/Status'
import { EventManager } from '../managers/Event'
import { StringEventNames } from '../index'
import { Reader } from '../core/Reader'
import { BDJSLog } from '../util/BDJSLog'
import { Plugin } from './Plugin'

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
    disableLogs?: boolean
    debug?: boolean
    events: StringEventNames[]
    mentionPrefix?: boolean
    plugins?: Plugin[]
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
    public vars: VariableManager | null = null
    constructor(options: BDJSOptions) {
        super(options)
        this.extraOptions = options
        // this.db = new DataBase(options.database)
        // this.vars = new VariableManager(options.database?.tables.map(t => t.name) ?? ['main'], this.db)

        // Prefix validation
        if (options.prefixes.length === 0)
            BDJSLog.error('Provide 1 prefix at least!'), process.exit()
    }

    /**
     * Login the BDJS client into the Discord Gateway.
     * @returns {Promise<string>}
     */
    override async login() {
        // Error handler.
        this.on('error', error => require('../events/error').default.listener(this, error))
        this.on('ready', () => require('../events/ready').default.listener(this))

        // Loading core.
        await this.events.loadNatives(this)
        return await super.login(
            this.extraOptions.auth
        )
    }
}