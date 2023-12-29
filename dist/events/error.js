"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../structures/Event");
const BDJSLog_1 = require("../util/BDJSLog");
const Data_1 = require("../structures/Data");
const util_1 = require("util");
exports.default = new Event_1.BaseEvent({
    name: 'onError',
    description: 'Executed when an error is emitted.',
    async listener(bot, error) {
        BDJSLog_1.BDJSLog.error((0, util_1.inspect)(error, { depth: 5 }));
        if (bot.extraOptions.events.includes('onError')) {
            const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'error');
            const data = new Data_1.Data({
                bot,
                commandType: 'error',
                env: {
                    error
                },
                functions: bot.functions,
                reader: bot.reader
            });
            data.functions.add({
                name: 'getError',
                description: 'Get an error prooerty.',
                code: async (d, [property]) => {
                    const properties = ['message', 'stack', 'raw'];
                    if (!properties.includes(property.toLowerCase()))
                        throw new data.error(data, 'invalid', 'property', data.function?.name);
                    const err = (0, util_1.inspect)(property.toLowerCase() === 'raw' ? error : error[property], { depth: 4 });
                    return err;
                }
            });
            for (const command of commands) {
                data.command = command;
                await data.reader.compile(command.code, data);
            }
        }
    }
});
