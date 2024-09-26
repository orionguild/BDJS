"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
const commandType = 'entitlementUpdate';
exports.default = new Event_1.BaseEvent({
    name: 'onEntitlementUpdate',
    description: 'Executed when an entitlements is updated.',
    async listener(bot, env) {
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === commandType);
        const data = new Data_1.Data({
            bot,
            commandType,
            env,
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
