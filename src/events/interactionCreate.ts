import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { Interaction } from 'discord.js'

export default new BaseEvent<[Interaction]>({
    name: 'onInteractionCreate',
    description: 'Executed when an interaction is created.',
    async listener(bot, interaction) {
        const context = new Context({
            author: interaction.user,
            channel: interaction.channel,
            guild: interaction.guild,
            interaction,
            member: interaction.member,
            raw: interaction
        }, bot)

        // Any interaction commands.
        Array.from(bot.commands.values()).filter(cmd => cmd.type === 'anyInteraction').forEach(async cmd => {
            const data = new Data({
                bot,
                commandType: 'anyInteraction',
                ctx: context,
                command: cmd,
                functions: bot.functions,
                reader: bot.reader
            })
            await data.reader.compile(cmd.code, data)
        })

        // Button interactions.
        if (interaction.isButton()) {
            const command = Array.from(Array.from(bot.commands.values()).values()).filter(
                cmd => cmd.type === 'buttonInteraction'
            ).find(
                cmd => cmd.name === interaction.customId
            )

            const data = new Data({
                bot,
                commandType: 'buttonInteraction',
                ctx: context,
                functions: bot.functions,
                reader: bot.reader
            })

            if (command) data.command = command, await data.reader.compile(command.code, data)
        }

        // Select menu interactions.
        if (interaction.isAnySelectMenu()) {
            const command = Array.from(Array.from(bot.commands.values()).values()).filter(
                cmd => cmd.type === 'selectMenuInteraction'
            ).find(
                cmd => cmd.name === interaction.customId
            )

            const data = new Data({
                bot,
                commandType: 'selectMenuInteraction',
                ctx: context,
                functions: bot.functions,
                reader: bot.reader
            })

            if (command) data.command = command, await data.reader.compile(command.code, data)
        }

        // Modal interactions.
        if (interaction.isModalSubmit()) {
            const command = Array.from(bot.commands.values()).filter(
                cmd => cmd.type === 'modalInteraction'
            ).find(
                cmd => cmd.name === interaction.customId
            )

            const data = new Data({
                bot,
                commandType: 'modalInteraction',
                ctx: context,
                functions: bot.functions,
                reader: bot.reader
            })

            if (command) data.command = command, await data.reader.compile(command.code, data)
        }

        // Slash commands
        if (interaction.isChatInputCommand()) {
            const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'commandInteraction')
            const command = interaction.options.getSubcommandGroup(false)
                ? commands.find(cmd => cmd.name?.toLowerCase() === `${interaction.commandName} ${interaction.options.getSubcommand(false)} ${interaction.options.getSubcommandGroup(false)}`)
                : interaction.options.getSubcommand(false) ? commands.find(cmd => cmd.name?.toLowerCase() === `${interaction.commandName} ${interaction.options.getSubcommand(false)}`)
                    : commands.find(cmd => cmd.name?.toLowerCase() === interaction.commandName)

            const data = new Data({
                bot,
                commandType: 'commandInteraction',
                ctx: context,
                functions: bot.functions,
                reader: bot.reader
            })

            if (command) data.command = command, await data.reader.compile(command.code, data)
        }

        // User context menus
        if (interaction.isUserContextMenuCommand()) {
            const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'userContextMenuInteraction')
            const command = commands.find(cmd => cmd.name?.toLowerCase() === interaction.commandName)

            const data = new Data({
                bot,
                commandType: 'userContextMenuInteraction',
                ctx: context,
                env: {
                    targetId: interaction.targetId,
                    targetMember: interaction.targetMember,
                    targetUser: interaction.targetUser
                },
                functions: bot.functions,
                reader: bot.reader
            })

            if (command) data.command = command, await data.reader.compile(command.code, data)
        }

        // Message context menus
        if (interaction.isMessageContextMenuCommand()) {
            const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === 'messageContextMenuInteraction')
            const command = commands.find(cmd => cmd.name?.toLowerCase() === interaction.commandName)

            context.message = interaction.targetMessage

            const data = new Data({
                bot,
                commandType: 'messageContextMenuInteraction',
                ctx: context,
                env: {
                    targetId: interaction.targetId,
                    targetMessage: interaction.targetMessage
                },
                functions: bot.functions,
                reader: bot.reader
            })

            if (command) data.command = command, await data.reader.compile(command.code, data)
        }
    }
})