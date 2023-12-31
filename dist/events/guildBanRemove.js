"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onGuildBanRemove',
    description: 'Executed when a guild ban is removed.',
    async listener(bot, ban) {
        const context = new Context_1.Context({
            author: ban.user,
            guild: ban.guild,
            raw: ban
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'banRemove');
        const data = new Data_1.Data({
            bot, context,
            env: {
                'reason': ban.reason
            },
            commandType: 'banRemove',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
