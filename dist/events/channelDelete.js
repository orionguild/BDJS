"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onChannelDelete',
    description: 'Executed when a channel is deleted.',
    async listener(bot, channel) {
        if (channel.type === discord_js_1.ChannelType.DM)
            return;
        const context = new Context_1.Context({
            channel,
            guild: channel.guild,
            raw: channel
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'channelDelete');
        const data = new Data_1.Data({
            bot, context,
            commandType: 'channelDelete',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
