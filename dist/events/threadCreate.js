"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onThreadCreate',
    description: 'Executed when a thread is created.',
    async listener(bot, thread, newlyCreated) {
        const context = new Context_1.Context({
            guild: thread.guild,
            raw: thread
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'threadCreate');
        const data = new Data_1.Data({
            bot, context, env: { newlyCreated },
            commandType: 'threadCreate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
