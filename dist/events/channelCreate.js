"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onChannelCreate',
    description: 'Executed when a channel is created.',
    async listener(bot, channel) {
        const context = new Context_1.Context({
            channel,
            guild: channel.guild,
            raw: channel
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'channelCreate');
        const data = new Data_1.Data({
            bot, context,
            commandType: 'channelCreate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
