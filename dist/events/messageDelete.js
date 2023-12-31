"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onMessageDelete',
    description: 'Executed when a message is deleted.',
    async listener(bot, message) {
        const context = new Context_1.Context({
            author: message.author,
            channel: message.channel,
            guild: message.guild,
            member: message.member,
            message,
            raw: message
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'messageDelete');
        const data = new Data_1.Data({
            bot, context,
            env: {
                '__BDJS__ARGS__': message.content.split(/ +/g)
            },
            commandType: 'messageDelete',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
