"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../structures/Event");
const Context_1 = require("../structures/Context");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onTypingStart',
    description: 'Executed when someone starts typing.',
    async listener(bot, typing) {
        const context = new Context_1.Context({
            author: typing.user,
            channel: typing.channel,
            guild: typing.inGuild() ? typing.guild : null,
            raw: typing
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'typing');
        const data = new Data_1.Data({
            bot, ctx: context,
            commandType: 'typing',
            env: {},
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
