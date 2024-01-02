"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onUserUpdate',
    description: 'Executed when an user is updated.',
    async listener(bot, old, user) {
        const context = new Context_1.Context({
            author: user,
            raw: user
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'userUpdate');
        const data = new Data_1.Data({
            bot, ctx: context,
            env: {
                '__BDJS__OLD__USER__': old,
                '__BDJS__NEW__USER__': user
            },
            commandType: 'userUpdate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
