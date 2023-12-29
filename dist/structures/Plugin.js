"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const Function_1 = require("../managers/Function");
const Event_1 = require("../managers/Event");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const Function_2 = require("./Function");
const Event_2 = require("./Event");
/**
 * Represents a BDJS plugin.
 */
class Plugin {
    constructor(data) {
        this.functionManager = new Function_1.FunctionManager;
        this.eventManager = new Event_1.EventManager;
        if (!data)
            throw new Error('Missing plugin metadata!');
        this.name = data.name;
        this.description = data.description;
        this.version = data.version;
    }
    async load(dir, providing_cwd = false) {
        const root = providing_cwd ? '' : process.cwd();
        const files = await (0, promises_1.readdir)((0, path_1.join)(root, dir));
        for (const file of files) {
            const stat = await (0, promises_1.lstat)((0, path_1.join)(root, dir, file));
            if (stat.isDirectory()) {
                await this.load((0, path_1.join)(dir, file), providing_cwd);
                continue;
            }
            else if (!file.endsWith('.js'))
                continue;
            const mod = require((0, path_1.join)(root, dir, file)).default;
            if (mod instanceof Function_2.BaseFunction) {
                const name = file.slice(file.startsWith('$') ? 1 : 0, -3).toLowerCase();
                this.functionManager.set(name, mod);
            }
            else if (mod instanceof Event_2.BaseEvent) {
                this.eventManager.set(mod.name, mod);
            }
        }
    }
    /**
     * Custom setup to let developers extend its plugin.
     * @param bot - BDJS client instance.
     */
    async customSetup(bot) { }
    /**
     * Attach this plugin into the BDJS client.
     * @param bot - BDJS client.
     */
    __attach__(bot) {
        if (this.functionManager.size > 0) {
            this.functionManager.forEach((func, name) => {
                bot.functions.set(name, func);
            });
        }
        if (this.eventManager.size > 0) {
            this.eventManager.forEach((event, name) => {
                bot.on(name, (...args) => event.listener(bot, ...args));
            });
        }
        this.customSetup(bot);
    }
}
exports.Plugin = Plugin;
