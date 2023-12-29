"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = exports.reformulateEvents = void 0;
const ApplicationCommand_1 = require("../managers/ApplicationCommand");
const discord_js_1 = require("discord.js");
const Function_1 = require("../managers/Function");
const Command_1 = require("../managers/Command");
const Status_1 = require("../managers/Status");
const Event_1 = require("../managers/Event");
const Reader_1 = require("../core/Reader");
const BDJSLog_1 = require("../util/BDJSLog");
/**
 * Convert BDJS names into RAW discord.js client.
 * @param names - Client events.
 * @param type - Reformulation type.
 * @returns {string[]}
 */
function reformulateEvents(names, type = 'BDJS') {
    names = [...names];
    for (let i = 0; i < names.length; i++) {
        if (type === 'BDJS')
            names[i] = 'on' + names[i][0].toUpperCase() + names[i].slice(1);
        else if (type === 'DJS')
            names[i] = names[i].toLowerCase().slice(2, 1) + names[i][2].toLowerCase() + names[i].slice(3);
    }
    return names;
}
exports.reformulateEvents = reformulateEvents;
/**
 * Represents a BDJS client.
 */
class Bot extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.appManager = new ApplicationCommand_1.BDJSApplicationCommandManager(this);
        this.commands = new Command_1.CommandManager;
        this.events = new Event_1.EventManager;
        this.functions = new Function_1.FunctionManager;
        this.reader = new Reader_1.Reader;
        this.status = new Status_1.StatusManager(this);
        this.db = null;
        this.vars = null;
        this.extraOptions = options;
        // this.db = new DataBase(options.database)
        // this.vars = new VariableManager(options.database?.tables.map(t => t.name) ?? ['main'], this.db)
        // Prefix validation
        if (options.prefixes.length === 0)
            BDJSLog_1.BDJSLog.error('Provide 1 prefix at least!'), process.exit();
    }
    /**
     * Load variables into the client.
     * @param data - Variable records.
     * @param {string} [table="main"] - Table name.
     * @returns {VariableManager}
     */
    variables(data, table = 'main') {
        return this.vars?.fillTable(data, table);
    }
    /**
     * Login the BDJS client into the Discord Gateway.
     * @returns {Promise<string>}
     */
    async login() {
        // Error handler.
        this.on('error', error => require('../events/error').default.listener(this, error));
        this.on('ready', () => require('../events/ready').default.listener(this));
        // Loading core.
        await this.events.loadNatives(this);
        await this.db.init();
        return await super.login(this.extraOptions.auth);
    }
}
exports.Bot = Bot;
