"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onStickerCreate',
    description: 'Executed when an sticker is created.',
    async listener(bot, sticker) {
        const context = new Context_1.Context({
            author: sticker.user,
            guild: sticker.guild,
            raw: sticker
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'stickerCreate');
        const data = new Data_1.Data({
            bot, context,
            commandType: 'stickerCreate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
