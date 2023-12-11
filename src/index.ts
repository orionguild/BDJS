import { ActivityType, SlashCommandBuilder } from 'discord.js'
import { BaseFunction } from './structures/Function'
import { BDJSOptions, Bot } from './structures/Bot'
import { CommandData } from './managers/Command'
import { Data } from './structures/Data'
import { BDJSLog } from './util/BDJSLog'

export type StringCommandTypes = 'always'
| 'ready'
| 'prefixed'
| 'unprefixed'
| 'anyInteraction'
| 'modalInteraction'
| 'buttonInteraction'
| 'commandInteraction'
| 'selectMenuInteraction'
| 'contextMenuInteraction'
| 'autocompleteInteraction'
| 'unknown'

export type StringEventNames = 'onApplicationCommandPermissionsUpdate'
| 'onAutoModerationActionExecution'
| 'onAutoModerationRuleCreate'
| 'onAutoModerationRuleDelete'
| 'onAutoModerationRuleUpdate'
| 'onCacheSweep'
| 'onChannelCreate'
| 'onChannelDelete'
| 'onChannelPinsUpdate'
| 'onChannelUpdate'
| 'onDebug'
| 'onWarn'
| 'onEmojiCreate'
| 'onEmojiDelete'
| 'onEmojiUpdate'
| 'onError'
| 'onGuildAuditLogEntryCreate'
| 'onGuildAvailable'
| 'onGuildBanAdd'
| 'onGuildBanRemove'
| 'onGuildCreate'
| 'onGuildDelete'
| 'onGuildUnavailable'
| 'onGuildIntegrationsUpdate'
| 'onGuildMemberAdd'
| 'onGuildMemberAvailable'
| 'onGuildMemberRemove'
| 'onGuildMembersChunk'
| 'onGuildMemberUpdate'
| 'onGuildUpdate'
| 'onInviteCreate'
| 'onInviteDelete'
| 'onMessageCreate'
| 'onMessageDelete'
| 'onMessageReactionRemoveAll'
| 'onMessageReactionRemoveEmoji'
| 'onMessageDeleteBulk'
| 'onMessageReactionAdd'
| 'onMessageReactionRemove'
| 'onMessageUpdate'
| 'onPresenceUpdate'
| 'onReady'
| 'onInvalidated'
| 'onRoleCreate'
| 'onRoleDelete'
| 'onRoleUpdate'
| 'onThreadCreate'
| 'onThreadDelete'
| 'onThreadListSync'
| 'onThreadMemberUpdate'
| 'onThreadMembersUpdate'
| 'onThreadUpdate'
| 'onTypingStart'
| 'onUserUpdate'
| 'onVoiceStateUpdate'
| 'onWebhookUpdate'
| 'onWebhooksUpdate'
| 'onInteractionCreate'
| 'onShardDisconnect'
| 'onShardError'
| 'onShardReady'
| 'onShardReconnecting'
| 'onShardResume'
| 'onStageInstanceCreate'
| 'onStageInstanceUpdate'
| 'onStageInstanceDelete'
| 'onStickerCreate'
| 'onStickerDelete'
| 'onStickerUpdate'
| 'onGuildScheduledEventCreate'
| 'onGuildScheduledEventUpdate'
| 'onGuildScheduledEventDelete'
| 'onGuildScheduledEventUserAdd'
| 'onGuildScheduledEventUserRemove'

function BDJSDefaultOptions(auth: `${string}.${string}.${string}`, prefixes: string[]) {
    if (!auth) return BDJSLog.error('You must provide a bot token!')
    if (prefixes.length === 0) return BDJSLog.error('You must provide 1 prefix at least!')
    return {
        auth,
        database: {
            tables: [
                {
                    name: 'main',
                    mod: './database/main.json'
                }
            ],
            timeoutsTable: 'timeouts',
            autoSave: false,
            mod: './database'
        },
        events: [
            'onReady',
            'onMessageCreate'
        ],
        intents: [
            'Guilds',
            'GuildMessages',
            'MessageContent'
        ],
        prefixes
    } as BDJSOptions
}

export {
    ActivityType,
    BaseFunction,
    BDJSOptions,
    BDJSDefaultOptions,
    Bot,
    CommandData,
    Data,
    BDJSLog,
    SlashCommandBuilder
}