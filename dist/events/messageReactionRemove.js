"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onMessageReactionRemove',
    description: 'Executed when a message reaction is removed.',
    async listener(bot, reaction, user) {
        const context = new Context_1.Context({
            author: user,
            message: reaction.message,
            raw: reaction
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'reactionRemove');
        const data = new Data_1.Data({
            bot, context,
            env: {
                '__BDJS__ARGS__': reaction.message.content?.split(/ +/g)
            },
            commandType: 'reactionRemove',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
