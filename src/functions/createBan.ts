import { BaseFunction } from '../structures/Function'
import { BanOptions } from 'discord.js'
import { inspect } from 'util'
import ms from 'ms'

export default new BaseFunction({
    description: 'Creates a ban for the provided user ID in a guild.',
    parameters: [
        {
            name: 'User ID',
            description: 'The user ID to be banned.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The Guild ID where the user will be banned from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function(d, [userID, guildID = d.ctx?.guild?.id, options]) {
        if (userID === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)

        const member = await d.util.getMember(userID, d.ctx?.guild!)
        if (!member) throw new d.error(d, 'invalid', 'member', d.function?.name!)
        
        const ban = {} as BanOptions

        if (options) {
            const data = d.extend(d)
            data.functions.add({
                name: 'setMessageDeleteSeconds',
                description: 'Set the messages to be deleted after the ban. In seconds.',
                code: async (t, [seconds]) => {
                    if (seconds === undefined) throw new t.error(t, 'required', 'delete message seconds', t.function?.name!)
                    ban.deleteMessageSeconds = ms(seconds)
                }
            }).add({
                name: 'setReason',
                description: 'Set the ban reason.',
                code: async (t, [reason]) => {
                    if (reason === undefined) throw new t.error(t, 'required', 'reason', t.function?.name!)
                    ban.reason = reason
                }
            })

            await data.reader.compile(options, data)
        }

        await member.ban('deleteMessageSeconds' in ban || 'reason' in ban ? ban : undefined).catch(e => {
            throw new d.error(d, 'custom', inspect(e))
        })
    }
})