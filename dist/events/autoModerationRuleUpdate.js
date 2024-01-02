"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onAutoModerationRuleUpdate',
    description: 'Executed when an automoderation rule is updated.',
    async listener(bot, old, rule) {
        const context = new Context_1.Context({
            author: bot.users.cache.get(rule.creatorId),
            guild: rule.guild,
            member: rule.guild.members.cache.get(rule.creatorId),
            raw: rule
        }, bot);
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'automodRuleUpdate');
        const data = new Data_1.Data({
            bot, ctx: context,
            env: {
                '__BDJS__OLD__RULE__': old,
                '__BDJS__NEW__RULE__': rule
            },
            commandType: 'automodRuleUpdate',
            functions: bot.functions,
            reader: bot.reader
        });
        for (const command of commands) {
            data.command = command;
            await data.reader.compile(command.code, data);
        }
    }
});
