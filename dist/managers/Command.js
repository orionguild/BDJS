"use strict";
var _CommandManager_instances, _CommandManager_cwd, _CommandManager_directory, _CommandManager_commandStatus, _CommandManager_validateType, _CommandManager_logCommands;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const tslib_1 = require("tslib");
const ascii_table3_1 = require("ascii-table3");
const promises_1 = require("fs/promises");
const BDJSLog_1 = require("../util/BDJSLog");
const crypto_1 = require("crypto");
const path_1 = require("path");
const cli_color_1 = tslib_1.__importDefault(require("cli-color"));
class CommandManager extends Map {
    constructor() {
        super(...arguments);
        _CommandManager_instances.add(this);
        /**
         * Mark as "directory provides cwd".
         */
        _CommandManager_cwd.set(this, false
        /**
         * The load commands directory.
         */
        );
        /**
         * The load commands directory.
         */
        _CommandManager_directory.set(this, null
        /**
         * To save all loaded command statuses.
         */
        );
        /**
         * To save all loaded command statuses.
         */
        _CommandManager_commandStatus.set(this, []
        /**
         * Add a commands into the manager.
         * @param commands - Array of commands.
         * @returns {CommandManager}
         */
        );
    }
    /**
     * Add a commands into the manager.
     * @param commands - Array of commands.
     * @returns {CommandManager}
     */
    add(...commands) {
        for (const command of commands) {
            if (!command._path_)
                command._path_ = 'main_file'.toUpperCase();
            command.name = command.name ?? (0, crypto_1.randomUUID)().slice(0, 13).toUpperCase();
            if (!command.code) {
                BDJSLog_1.BDJSLog.error(`"${command.name}" can't be loaded!` + [
                    '|-> at: ' + command.name
                ].join('\n'));
                continue;
            }
            else if (!tslib_1.__classPrivateFieldGet(this, _CommandManager_instances, "m", _CommandManager_validateType).call(this, command.type)) {
                BDJSLog_1.BDJSLog.error([
                    `Invalid command type "${command.type}" provided`,
                    '|-> at: ' + command._path_ + ' => ' + command.name,
                ].join('\n'));
                continue;
            }
            this.set(command.name, command);
            tslib_1.__classPrivateFieldGet(this, _CommandManager_commandStatus, "f").push({
                name: command.name,
                path: command._path_,
                type: command.type,
                status: 'Loaded'
            });
        }
        return this;
    }
    /**
     * Load all commands inside a directory.
     * @param dir - Commands directory.
     * @param providing_cwd - Set to "true" if your directory provides a custom cwd.
     * @param log - BDJSLog commands.
     */
    async load(dir, providing_cwd = false, log = false) {
        const root = providing_cwd ? '' : process.cwd();
        const files = await (0, promises_1.readdir)((0, path_1.join)(root, dir));
        tslib_1.__classPrivateFieldSet(this, _CommandManager_cwd, providing_cwd, "f");
        tslib_1.__classPrivateFieldSet(this, _CommandManager_directory, dir, "f");
        for (const file of files) {
            const stat = await (0, promises_1.lstat)((0, path_1.join)(root, dir, file));
            if (stat.isDirectory()) {
                await this.load((0, path_1.join)(dir, file), providing_cwd, false);
                continue;
            }
            const command = require((0, path_1.join)(root, dir, file));
            if (Array.isArray(command)) {
                for (const cmd of command) {
                    if (!('code' in cmd)) {
                        BDJSLog_1.BDJSLog.error(`"${file}" can't be loaded!` + [
                            '|-> at: ' + (0, path_1.join)(root, dir, file)
                        ].join('\n'));
                        continue;
                    }
                    else if (!tslib_1.__classPrivateFieldGet(this, _CommandManager_instances, "m", _CommandManager_validateType).call(this, cmd.type)) {
                        BDJSLog_1.BDJSLog.error([
                            `Invalid command type "${cmd.type}" provided`,
                            '|-> at: ' + (0, path_1.join)(root, dir, file)
                        ].join('\n'));
                        continue;
                    }
                    // Ensure command name.
                    cmd.name = cmd.name ?? (0, crypto_1.randomUUID)().slice(0, 13).toUpperCase();
                    // Assign command path.
                    cmd._path_ = (0, path_1.join)(root, dir, file);
                    this.set(cmd.name, cmd);
                    tslib_1.__classPrivateFieldGet(this, _CommandManager_commandStatus, "f").push({
                        name: cmd.name,
                        path: cmd._path_,
                        type: cmd.type,
                        status: 'Loaded'
                    });
                }
            }
            else {
                if (!('code' in command)) {
                    BDJSLog_1.BDJSLog.error(`"${file}" can't be loaded!` + [
                        '|-> at: ' + (0, path_1.join)(root, dir, file)
                    ].join('\n'));
                    continue;
                }
                else if (!tslib_1.__classPrivateFieldGet(this, _CommandManager_instances, "m", _CommandManager_validateType).call(this, command.type)) {
                    BDJSLog_1.BDJSLog.error([
                        `Invalid command type "${command.type}" provided`,
                        '|-> at: ' + (0, path_1.join)(root, dir, file)
                    ].join('\n'));
                    continue;
                }
                // Ensure command name.
                command.name = command.name ?? (0, crypto_1.randomUUID)().slice(0, 13).toUpperCase();
                // Assign command path.
                command._path_ = (0, path_1.join)(root, dir, file);
                this.set(command.name, command);
                tslib_1.__classPrivateFieldGet(this, _CommandManager_commandStatus, "f").push({
                    name: command.name,
                    path: command._path_,
                    type: command.type,
                    status: 'Loaded'
                });
            }
            delete require.cache[require.resolve((0, path_1.join)(root, dir, file))];
        }
        tslib_1.__classPrivateFieldGet(this, _CommandManager_instances, "m", _CommandManager_logCommands).call(this);
    }
    /**
     * Reload commands from source.
     * @param bot - BDJS client.
     * @returns {Promise<void>}
     */
    async reload(bot) {
        if (!tslib_1.__classPrivateFieldGet(this, _CommandManager_directory, "f"))
            return BDJSLog_1.BDJSLog.error('Cannot find a commands directory.');
        this.clear();
        return await this.load(tslib_1.__classPrivateFieldGet(this, _CommandManager_directory, "f"), tslib_1.__classPrivateFieldGet(this, _CommandManager_cwd, "f"), true);
    }
    /**
     * Return all valid command types.
     */
    get types() {
        return [
            'always',
            'error',
            'prefixed',
            'unprefixed',
            'ready',
            'anyInteraction',
            'autocompleteInteraction',
            'buttonInteraction',
            'commandInteraction',
            'userContextMenuInteraction',
            'messageContextMenuInteraction',
            'modalInteraction',
            'selectMenuInteraction',
            'typing',
            'memberJoin',
            'memberLeave',
            'memberUpdate',
            'botJoin',
            'botLeave',
            'channelCreate',
            'channelDelete',
            'channelUpdate',
            'messageDelete',
            'messageUpdate',
            'reactionAdd',
            'reactionRemove',
            'unknown',
            // BDJS Customs
            'interval',
            'timeout'
        ];
    }
}
exports.CommandManager = CommandManager;
_CommandManager_cwd = new WeakMap(), _CommandManager_directory = new WeakMap(), _CommandManager_commandStatus = new WeakMap(), _CommandManager_instances = new WeakSet(), _CommandManager_validateType = function _CommandManager_validateType(type) {
    const types = this.types;
    return types.includes(type);
}, _CommandManager_logCommands = function _CommandManager_logCommands() {
    const rows = [];
    const table = new ascii_table3_1.AsciiTable3('Commands');
    table.setHeading('Name', 'Type', 'Status', 'Path')
        .setAlign(2, ascii_table3_1.AlignmentEnum.AUTO)
        .setStyle('compact');
    for (const data of tslib_1.__classPrivateFieldGet(this, _CommandManager_commandStatus, "f")) {
        rows.push([
            data.name,
            data.type,
            data.status === 'Loaded' ? cli_color_1.default.green('LOADED') : cli_color_1.default.red('NOT LOADED'),
            ascii_table3_1.AsciiTable3.truncateString(data.path, 20)
        ]);
    }
    table.addRowMatrix(rows);
    console.log(table.toString());
    tslib_1.__classPrivateFieldGet(this, _CommandManager_commandStatus, "f").length = 0;
    return this;
};
