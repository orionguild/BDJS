import { Context } from '../structures/Context'
import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { Message } from 'discord.js'

export default new BaseEvent<[Message]>({
    name: 'onMessageCreate',
    description: 'Executed when a message is created.',
    async listener(bot, message) {
        const replyBots = bot.extraOptions.replyBots ?? false
        if (replyBots === false && message.author.bot) return;

        const context = new Context(message)
        const unprefixed = bot.commands.filter(command => command.type === 'unprefixed')
        const prefixed = bot.commands.filter(command => command.type === 'prefixed')
        const always = bot.commands.filter(command => command.type === 'always')

        // Always reply commands.
        for (const command of always) {
            const data = new Data({
                bot,
                context,
                env: {
                    '__BDJS__ARGS__': message.content.split(/ +/g)
                },
                commandType: 'always',
                functions: bot.functions,
                instanceTime: new Date,
                reader: bot.reader,
            })
            const compiled = await data.reader.compile(
                command.code,
                data
            )
            if (compiled.code !== '') await message.channel.send(compiled.code)
        }

        // Unprefixed commands.
        {
            const args = message.content.split(/ +/g)
            const commandName = args.shift()?.toLowerCase() ?? ''
            const command = unprefixed.find(cmd => cmd.name === commandName || cmd.aliases?.includes(commandName))
            if (command) {
                const data = new Data({
                    bot,
                    context,
                    commandType: 'unprefixed',
                    env: {
                        '__BDJS__ARGS__': args
                    },
                    functions: bot.functions,
                    instanceTime: new Date,
                    reader: bot.reader,
                })
                const compiled = await data.reader.compile(
                    command.code,
                    data
                )
                if (compiled.code !== '') await message.channel.send(compiled.code)
            }
        }

        // Prefixed commands.
        const args = message.content.split(/ +/g)
        const data = new Data({
            bot,
            context,
            commandType: 'prefixed',
            env: {
                '__BDJS__ARGS__': args
            },
            functions: bot.functions,
            instanceTime: new Date,
            reader: bot.reader,
        })
        const prefixes = bot.extraOptions.prefixes.map(async prefix => {
            const compiled = await data.reader.compile(prefix, data)
            const prx = compiled?.code.toLowerCase()
            return prx
        })
        const prefix = await prefixes.find(
            async prx => args[0].toLowerCase().startsWith(await prx as string)
        )
        if (!prefix) return;
        const commandName = args.shift()?.slice(prefix.length).toLowerCase() ?? ''
        const command = prefixed.find(cmd => cmd.name?.toLowerCase() === commandName || cmd.aliases?.includes(commandName))
        if (command) {
            const compiled = await data.reader.compile(
                command.code,
                data
            )
            if (compiled.code !== '') await message.channel.send(compiled.code)
        }
    }
})