"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onPresenceUpdate',
    description: 'Executed when a presence is updated.',
    async listener(bot, old, presence) {
        const context = new Context_1.Context({
            author: presence.user,
            guild: presence.guild,
            member: presence.member,
            raw: presence
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'presenceUpdate');
        const data = new Data_1.Data({
            bot, ctx: context,
            env: {
                '__BDJS__OLD__PRESENCE__': old?.activities[0],
                '__BDJS__NEW__PRESENCE__': presence.activities[0],
            },
            commandType: 'emojiUpdate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
