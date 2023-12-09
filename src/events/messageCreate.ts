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
        const data = new Data({
            context,
            commandType: 'unprefixed',
            functions: bot.functions,
            instanceTime: new Date,
            reader: bot.reader,
        })

        // Always reply commands.
        for (const command of always) {
            const res = await data.reader.compile(
                command.code,
                data
            )
            if (res?.code) await message.channel.send(res.code)
        }

        // Unprefixed commands.
        {
            const args = message.content.split(/ +/g)
            const commandName = args.shift()?.toLowerCase() ?? ''
            const command = unprefixed.find(cmd => cmd.name === commandName || cmd.aliases?.includes(commandName))
            if (command) {
                const res = await data.reader.compile(
                    command.code,
                    data
                )
                if (res?.code) await message.channel.send(res.code)
            }
        }

        // Prefixed commands.
        const args = message.content.split(/ +/g)
        const prefixes = bot.extraOptions.prefixes.map(async prefix => {
            const res = await data.reader.compile(prefix, data)
            const prx = res?.code.toLowerCase()
            return prx
        })
        const prefix = await prefixes.find(
            async prx => args[0].toLowerCase().startsWith(await prx as string)
        )
        if (!prefix) return;
        const commandName = args.shift()?.slice(prefix.length).toLowerCase() ?? ''
        const command = prefixed.find(cmd => cmd.name?.toLowerCase() === commandName || cmd.aliases?.includes(commandName))
        if (command) {
            const res = await data.reader.compile(
                command.code,
                data
            )
            if (res?.code) await message.channel.send(res.code)
        }
    }
})