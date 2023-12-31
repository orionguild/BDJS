"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onMessageReactionAdd',
    description: 'Executed when a message reaction is added.',
    async listener(bot, reaction, user) {
        const context = new Context_1.Context({
            author: user,
            channel: reaction.message.channel,
            guild: reaction.message.guild,
            message: reaction.message,
            raw: reaction
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'reactionAdd');
        const data = new Data_1.Data({
            bot, context,
            env: {
                '__BDJS__ARGS__': reaction.message.content?.split(/ +/g)
            },
            commandType: 'reactionAdd',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
