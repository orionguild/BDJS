"use strict";
var _BDJSApplicationCommandManager_bot, _BDJSApplicationCommandManager_commands;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BDJSApplicationCommandManager = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const promises_1 = require("fs/promises");
const BDJSLog_1 = require("../util/BDJSLog");
const path_1 = require("path");
class BDJSApplicationCommandManager {
    constructor(bot) {
        _BDJSApplicationCommandManager_bot.set(this, void 0);
        _BDJSApplicationCommandManager_commands.set(this, void 0);
        tslib_1.__classPrivateFieldSet(this, _BDJSApplicationCommandManager_bot, bot, "f");
        tslib_1.__classPrivateFieldSet(this, _BDJSApplicationCommandManager_commands, new discord_js_1.Collection, "f");
    }
    /**
     * Upload slash command specifications to the Discord API.
     * @param dir - Command specifications directory.
     * @param providing_cwd - Mark as "true" if your path provides a custom cwd.
     */
    async load(dir, providing_cwd = false) {
        const root = providing_cwd ? '' : process.cwd();
        const files = await (0, promises_1.readdir)((0, path_1.join)(root, dir));
        for (const file of files) {
            const stat = await (0, promises_1.lstat)((0, path_1.join)(root, dir, file));
            if (stat.isDirectory()) {
                await this.load((0, path_1.join)(dir, file), providing_cwd);
                continue;
            }
            const spec = require((0, path_1.join)(root, dir, file));
            if (!Array.isArray(spec))
                tslib_1.__classPrivateFieldGet(this, _BDJSApplicationCommandManager_commands, "f").set(spec.data.name, spec.data instanceof discord_js_1.SlashCommandBuilder || spec.data instanceof discord_js_1.ContextMenuCommandBuilder
                    ? spec.data.toJSON() : spec.data);
            else {
                for (const cmd of spec) {
                    if (!('data' in cmd))
                        continue;
                    tslib_1.__classPrivateFieldGet(this, _BDJSApplicationCommandManager_commands, "f").set(cmd.data.name, cmd.data instanceof discord_js_1.SlashCommandBuilder || cmd.data instanceof discord_js_1.ContextMenuCommandBuilder
                        ? cmd.data.toJSON() : cmd.data);
                }
            }
            delete require.cache[(0, path_1.join)(root, dir, file)];
        }
    }
    /**
     * Upload all specifications to the Discord API.
     * @param guildIDs - Array of Guild IDs.
     */
    async sync(guildIDs) {
        if (Array.isArray(guildIDs)) {
            for (const guildID of guildIDs) {
                const guild = tslib_1.__classPrivateFieldGet(this, _BDJSApplicationCommandManager_bot, "f").guilds.cache.get(guildID) ?? await tslib_1.__classPrivateFieldGet(this, _BDJSApplicationCommandManager_bot, "f").guilds.fetch(guildID);
                if (!guild) {
                    BDJSLog_1.BDJSLog.error('Cannot sync command specifications to "' + guildID + '"');
                    continue;
                }
                await guild.commands.set(this.commandsArray).catch(e => {
                    BDJSLog_1.BDJSLog.error(JSON.stringify(e, null, 4));
                });
            }
        }
        else if (typeof guildIDs === 'undefined') {
            await tslib_1.__classPrivateFieldGet(this, _BDJSApplicationCommandManager_bot, "f").application.commands.set(this.commandsArray).catch(e => {
                BDJSLog_1.BDJSLog.error(JSON.stringify(e, null, 4));
            });
        }
    }
    /**
     * Returns the number of cached specifications.
     */
    get commandSize() {
        return tslib_1.__classPrivateFieldGet(this, _BDJSApplicationCommandManager_commands, "f").size;
    }
    /**
     * Returns all cached command sepecifications.
     */
    get commandsArray() {
        return Array.from(tslib_1.__classPrivateFieldGet(this, _BDJSApplicationCommandManager_commands, "f").values());
    }
}
exports.BDJSApplicationCommandManager = BDJSApplicationCommandManager;
_BDJSApplicationCommandManager_bot = new WeakMap(), _BDJSApplicationCommandManager_commands = new WeakMap();
