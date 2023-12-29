"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../structures/Event");
const Plugin_1 = require("../structures/Plugin");
const Data_1 = require("../structures/Data");
const BDJSLog_1 = require("../util/BDJSLog");
const undici_1 = require("undici");
const child_process_1 = require("child_process");
const util_1 = require("util");
exports.default = new Event_1.BaseEvent({
    name: 'onReady',
    description: 'Executed when client user is ready.',
    once: true,
    async listener(bot) {
        await bot.functions.loadNatives().then(() => {
            if (bot.extraOptions.debug === true)
                BDJSLog_1.BDJSLog.debug([
                    `${bot.functions.size} native functions were loaded`,
                    // '$' + bot.functions.keyArray().join(' - $')
                ].join('\n'));
        });
        // Plugin loader
        if (bot.extraOptions.plugins && bot.extraOptions.plugins.length > 0) {
            for (const plugin of bot.extraOptions.plugins) {
                if (plugin instanceof Plugin_1.Plugin) {
                    plugin.__attach__(bot);
                    BDJSLog_1.BDJSLog.info(`Plugin loaded: "${plugin.name}" - ${plugin.version}`);
                }
                else
                    // @ts-ignore
                    BDJSLog_1.BDJSLog.error('Cannot load plugin: ' + plugin.constructor.name);
            }
        }
        const autoUpdate = bot.extraOptions.autoUpdate ?? true;
        const disableLogs = bot.extraOptions.disableLogs ?? false;
        const currentVersion = (await Promise.resolve().then(() => __importStar(require('../../package.json')))).version;
        const result = await (0, undici_1.request)('https://registry.npmjs.org/bdjs', {
            dispatcher: new undici_1.Agent({
                keepAliveTimeout: 10000,
                keepAliveMaxTimeout: 15000
            }),
            headers: {
                'User-Agent': 'bdjs'
            }
        });
        const npmdata = await result.body.json();
        const fetchedVersion = npmdata['dist-tags'].latest;
        if (fetchedVersion !== currentVersion && disableLogs === false) {
            BDJSLog_1.BDJSLog.warn([
                'You are using an outdated version of BDJS!',
                'Last version: ' + fetchedVersion,
                'Current version: ' + currentVersion
            ].join('\n'));
        }
        else if (fetchedVersion === currentVersion && disableLogs === false) {
            BDJSLog_1.BDJSLog.info([
                'Using the latest version of BDJS: ' + currentVersion
            ].join('\n'));
        }
        if (autoUpdate && fetchedVersion !== currentVersion) {
            const res = (0, child_process_1.exec)('npm i bdjs@latest', error => {
                if (error) {
                    BDJSLog_1.BDJSLog.error([
                        'AutoUpdate Error',
                        JSON.stringify(error, null, 4)
                    ].join('\n'));
                }
                else {
                    BDJSLog_1.BDJSLog.info([
                        'Updated successfully',
                        'Please reboot the process.'
                    ].join('\n'));
                    process.exit();
                }
            });
        }
        if (!bot.extraOptions.events.includes('onReady'))
            return;
        const commands = Array.from(bot.commands.values()).filter(command => command.type === 'ready');
        const data = new Data_1.Data({
            bot,
            commandType: 'ready',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data).catch(e => {
                BDJSLog_1.BDJSLog.error((0, util_1.inspect)(e, { depth: 4 }));
            });
        }
        if (bot.status.size > 0)
            bot.status.rotate(data);
    }
});
