"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableManager = exports.SlashCommandBuilder = exports.Plugin = exports.Data = exports.ContextMenuCommandBuilder = exports.Bot = exports.BDJSLog = exports.BDJSDefaultOptions = exports.BaseFunction = exports.ApplicationCommandOptionType = exports.ApplicationCommandType = exports.ActivityType = void 0;
const discord_js_1 = require("discord.js");
Object.defineProperty(exports, "ActivityType", { enumerable: true, get: function () { return discord_js_1.ActivityType; } });
Object.defineProperty(exports, "ApplicationCommandType", { enumerable: true, get: function () { return discord_js_1.ApplicationCommandType; } });
Object.defineProperty(exports, "ApplicationCommandOptionType", { enumerable: true, get: function () { return discord_js_1.ApplicationCommandOptionType; } });
Object.defineProperty(exports, "ContextMenuCommandBuilder", { enumerable: true, get: function () { return discord_js_1.ContextMenuCommandBuilder; } });
Object.defineProperty(exports, "SlashCommandBuilder", { enumerable: true, get: function () { return discord_js_1.SlashCommandBuilder; } });
const Variable_1 = require("./managers/Variable");
Object.defineProperty(exports, "VariableManager", { enumerable: true, get: function () { return Variable_1.VariableManager; } });
const Function_1 = require("./structures/Function");
Object.defineProperty(exports, "BaseFunction", { enumerable: true, get: function () { return Function_1.BaseFunction; } });
const Bot_1 = require("./structures/Bot");
Object.defineProperty(exports, "Bot", { enumerable: true, get: function () { return Bot_1.Bot; } });
const Plugin_1 = require("./structures/Plugin");
Object.defineProperty(exports, "Plugin", { enumerable: true, get: function () { return Plugin_1.Plugin; } });
const Data_1 = require("./structures/Data");
Object.defineProperty(exports, "Data", { enumerable: true, get: function () { return Data_1.Data; } });
const BDJSLog_1 = require("./util/BDJSLog");
Object.defineProperty(exports, "BDJSLog", { enumerable: true, get: function () { return BDJSLog_1.BDJSLog; } });
function BDJSDefaultOptions(auth, prefixes) {
    if (!auth)
        return BDJSLog_1.BDJSLog.error('You must provide a bot token!');
    if (prefixes.length === 0)
        return BDJSLog_1.BDJSLog.error('You must provide 1 prefix at least!');
    return {
        auth,
        events: [
            'onReady',
            'onMessageCreate'
        ],
        intents: [
            'Guilds',
            'GuildMessages',
            'MessageContent'
        ],
        prefixes
    };
}
exports.BDJSDefaultOptions = BDJSDefaultOptions;
