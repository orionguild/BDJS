"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onGuildMemberUpdate',
    description: 'Executed when a guild member is updated.',
    async listener(bot, old_member, new_member) {
        const context = new Context_1.Context({
            author: new_member.user,
            guild: new_member.guild,
            member: new_member,
            raw: new_member
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'memberUpdate');
        const data = new Data_1.Data({
            bot, ctx: context,
            env: {
                '__BDJS__OLD__MEMBER__': old_member,
                '__BDJS__NEW__MEMBER__': new_member
            },
            commandType: 'memberUpdate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
