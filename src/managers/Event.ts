import { Bot, reformulateEvents } from '../structures/Bot'
import { AdvancedCollection } from 'nekord-collection'
import { BaseEvent } from '../structures/Event'
import { lstat, readdir } from 'fs/promises'
import { BDJSLog } from '../util/BDJSLog'
import { join } from 'path'

export class EventManager extends AdvancedCollection<string, BaseEvent<any>> {
    /**
     * Load events from a directory.
     * @param bot - BDJS client.
     */
    async load(bot: Bot) {
        const root = __dirname.replace('managers', 'events')
        const files = await readdir(root)

        for (const file of files) {
            if (file.endsWith('.js')) {
                if (file === 'error.js' || file === 'ready.js') continue
                const event = require(join(root, file)).default as BaseEvent<any>
                if (
                    event instanceof BaseEvent
                    &&
                    bot.extraOptions.events.includes(event.name)
                ) {
                    bot[event.once === true ? 'once' : 'on'](
                        reformulateEvents([event.name], 'DJS').join(''),
                        async (...args) => {
                            await event.listener(bot, ...args)
                        }
                    )
                    delete require.cache[join(root, file)]
                    if (bot.extraOptions.debug === true) BDJSLog.debug(
                        `"${event.name}" is being listened.`
                    )
                }
            }
        }

    }

    /**
     * Return all RAW string event names.
     */
    get names() {
        return [
            'applicationCommandPermissionsUpdate',
            'autoModerationActionExecution',
            'autoModerationRuleCreate',
            'autoModerationRuleDelete',
            'autoModerationRuleUpdate',
            'cacheSweep',
            'channelCreate',
            'channelDelete',
            'channelPinsUpdate',
            'channelUpdate',
            'debug',
            'warn',
            'emojiCreate',
            'emojiDelete',
            'emojiUpdate',
            'error',
            'guildAuditLogEntryCreate',
            'guildAvailable',
            'guildBanAdd',
            'guildBanRemove',
            'guildCreate',
            'guildDelete',
            'guildUnavailable',
            'guildIntegrationsUpdate',
            'guildMemberAdd',
            'guildMemberAvailable',
            'guildMemberRemove',
            'guildMembersChunk',
            'guildMemberUpdate',
            'guildUpdate',
            'inviteCreate',
            'inviteDelete',
            'messageCreate',
            'messageDelete',
            'messageReactionRemoveAll',
            'messageReactionRemoveEmoji',
            'messageDeleteBulk',
            'messageReactionAdd',
            'messageReactionRemove',
            'messageUpdate',
            'presenceUpdate',
            'ready',
            'invalidated',
            'roleCreate',
            'roleDelete',
            'roleUpdate',
            'threadCreate',
            'threadDelete',
            'threadListSync',
            'threadMemberUpdate',
            'threadMembersUpdate',
            'threadUpdate',
            'typingStart',
            'userUpdate',
            'voiceStateUpdate',
            'webhookUpdate',
            'webhooksUpdate',
            'interactionCreate',
            'shardDisconnect',
            'shardError',
            'shardReady',
            'shardReconnecting',
            'shardResume',
            'stageInstanceCreate',
            'stageInstanceUpdate',
            'stageInstanceDelete',
            'stickerCreate',
            'stickerDelete',
            'stickerUpdate',
            'guildScheduledEventCreate',
            'guildScheduledEventUpdate',
            'guildScheduledEventDelete',
            'guildScheduledEventUserAdd',
            'guildScheduledEventUserRemove'
        ]
    }

    /**
     * Return BDJS event names as string.
     */
    get reformulatedNames() {
        return reformulateEvents(this.names, 'BDJS')
    }
}