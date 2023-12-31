"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onRoleDelete',
    description: 'Executed when a role is deleted.',
    async listener(bot, old, role) {
        const context = new Context_1.Context({
            guild: role.guild,
            raw: role
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'roleUpdate');
        const data = new Data_1.Data({
            bot, context,
            env: {
                '__BDJS__OLD__ROLE__': old,
                '__BDJS__NEW__ROLE__': role
            },
            commandType: 'roleUpdate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
