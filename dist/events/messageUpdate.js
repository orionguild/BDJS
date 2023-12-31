"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onGuildMemberUpdate',
    description: 'Executed when a guild member is updated.',
    async listener(bot, old_msg, new_msg) {
        const context = new Context_1.Context({
            author: new_msg.author,
            guild: new_msg.guild,
            member: new_msg.member,
            raw: new_msg
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'messageUpdate');
        const data = new Data_1.Data({
            bot, context,
            env: {
                '__BDJS__OLD__MESSAGE': old_msg,
                '__BDJS__NEW__MESSAGE': new_msg,
                '__BDJS__ARGS__': new_msg.content?.split(/ +/g)
            },
            commandType: 'messageUpdate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
