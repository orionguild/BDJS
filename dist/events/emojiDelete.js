"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onEmojiDelete',
    description: 'Executed when an emoji is deleted.',
    async listener(bot, emoji) {
        const context = new Context_1.Context({
            author: emoji.author,
            guild: emoji.guild,
            raw: emoji
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'emojiDelete');
        const data = new Data_1.Data({
            bot, ctx: context,
            commandType: 'emojiDelete',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
