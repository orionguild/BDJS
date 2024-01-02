"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onAutoModerationRuleCreate',
    description: 'Executed when an auto moderation rule is created.',
    async listener(bot, rule) {
        const context = new Context_1.Context({
            guild: rule.guild,
            raw: rule
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'automodRuleCreate');
        const data = new Data_1.Data({
            bot, ctx: context,
            commandType: 'automodRuleCreate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
