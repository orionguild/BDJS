"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onGuildMemberRemove',
    description: 'Executed when a new member joins a guild.',
    async listener(bot, member) {
        const context = new Context_1.Context({
            author: member.user,
            guild: member.guild,
            member,
            raw: member
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'memberLeave');
        const data = new Data_1.Data({
            bot, ctx: context,
            commandType: 'memberLeave',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
