import { Bot } from './structures/Bot'

export type StringCommandTypes = 'ready' | 'prefixed' | 'unprefixed' | 'unknown'
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

export { Bot }