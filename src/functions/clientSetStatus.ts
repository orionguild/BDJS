import { ActivityType, PresenceStatusData } from 'discord.js'
import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Set the presence for the client.',
    parameters: [
        {
            name: 'Text',
            description: 'The text for the presence.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Type',
            description: 'The type for the presence.',
            required: false,
            resolver: 'String',
            value: 'playing'
        },
        {
            name: 'Status',
            description: 'Status type for the presence.',
            required: false,
            resolver: 'String',
            value: 'online'
        },
        {
            name: 'URL',
            description: 'Streaming URL, if set.',
            required: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'AFK',
            description: 'Whether client is AFK.',
            required: false,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function(d, [
        text,
        type = 'playing',
        status = 'online',
        url,
        afk = 'false'
    ]) {
        if (text === undefined) throw new d.error(d, 'required', 'URL', d.function?.name!)
        if (!['online', 'idle', 'dnd', 'invisible'].includes(status.toLowerCase()))
            throw new d.error(d, 'invalid', 'status', d.function?.name!)

        const activityTypes = {
            competing: ActivityType.Competing,
            custom: ActivityType.Custom,
            listening: ActivityType.Listening,
            playing: ActivityType.Playing,
            streaming: ActivityType.Streaming,
            watching: ActivityType.Watching
        } as Record<string, any>

        if (!Object.keys(activityTypes).includes(type.toLowerCase()))
            throw new d.error(d, 'invalid', 'activity type', d.function?.name!)

        try {
            d.bot?.user.setPresence({
                activities: [{
                    name: text,
                    state: type === 'custom' ? text : undefined,
                    type: activityTypes[type.toLowerCase()],
                    url
                }],
                afk: afk === 'true',
                status: status as PresenceStatusData
            })
        } catch (e) {
            throw new d.error(d, 'custom', inspect(e))
        }
    }
})