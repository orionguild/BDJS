"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onGuildCreate',
    description: 'Executed when bot joins a guild.',
    async listener(bot, guild) {
        const context = new Context_1.Context({
            guild,
            raw: guild
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'botJoin');
        const data = new Data_1.Data({
            bot,
            context,
            commandType: 'memberJoin',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
