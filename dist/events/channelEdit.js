"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onChannelUpdate',
    description: 'Executed when a channel is updated.',
    async listener(bot, old_channel, new_channel) {
        if (new_channel.type === discord_js_1.ChannelType.DM)
            return;
        const context = new Context_1.Context({
            channel: new_channel,
            guild: new_channel.guild,
            raw: new_channel
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'channelUpdate');
        const data = new Data_1.Data({
            bot, context,
            env: {
                '__BDJS__OLD__CHANNEL__': old_channel,
                '__BDJS__NEW__CHANNEL__': new_channel
            },
            commandType: 'channelUpdate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
