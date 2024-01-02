import { AutoModerationRule } from 'discord.js'
import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'

export default new BaseEvent<[AutoModerationRule]>({
    name: 'onAutoModerationRuleDelete',
    description: 'Executed when an auto moderation rule is deleted.',
    async listener(bot, rule) {
        const context = new Context({
            guild: rule.guild,
            raw: rule
        }, bot)
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'automodRuleDelete')
        const data = new Data({
            bot, ctx: context,
            commandType: 'automodRuleDelete',
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})