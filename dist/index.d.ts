import { ActivityType, ApplicationCommandType, ApplicationCommandOptionType, ContextMenuCommandBuilder, Shard, SlashCommandBuilder } from 'discord.js';
import { VariableManager } from './managers/Variable';
import { BaseFunction } from './structures/Function';
import { BDJSOptions, Bot } from './structures/Bot';
import { CommandData } from './managers/Command';
import { Plugin } from './structures/Plugin';
import { Data } from './structures/Data';
import { BDJSLog } from './util/BDJSLog';
export type StringCommandTypes = 'always' | 'error' | 'ready' | 'prefixed' | 'unprefixed' | 'anyInteraction' | 'modalInteraction' | 'buttonInteraction' | 'commandInteraction' | 'selectMenuInteraction' | 'contextMenuInteraction' | 'autocompleteInteraction' | 'memberJoin' | 'memberLeave' | 'botJoin' | 'botLeave' | 'typing' | 'unknown' | 'interval' | 'timeout';
export type StringEventNames = 'onApplicationCommandPermissionsUpdate' | 'onAutoModerationActionExecution' | 'onAutoModerationRuleCreate' | 'onAutoModerationRuleDelete' | 'onAutoModerationRuleUpdate' | 'onCacheSweep' | 'onChannelCreate' | 'onChannelDelete' | 'onChannelPinsUpdate' | 'onChannelUpdate' | 'onDebug' | 'onWarn' | 'onEmojiCreate' | 'onEmojiDelete' | 'onEmojiUpdate' | 'onError' | 'onGuildAuditLogEntryCreate' | 'onGuildAvailable' | 'onGuildBanAdd' | 'onGuildBanRemove' | 'onGuildCreate' | 'onGuildDelete' | 'onGuildUnavailable' | 'onGuildIntegrationsUpdate' | 'onGuildMemberAdd' | 'onGuildMemberAvailable' | 'onGuildMemberRemove' | 'onGuildMembersChunk' | 'onGuildMemberUpdate' | 'onGuildUpdate' | 'onInviteCreate' | 'onInviteDelete' | 'onMessageCreate' | 'onMessageDelete' | 'onMessageReactionRemoveAll' | 'onMessageReactionRemoveEmoji' | 'onMessageDeleteBulk' | 'onMessageReactionAdd' | 'onMessageReactionRemove' | 'onMessageUpdate' | 'onPresenceUpdate' | 'onReady' | 'onInvalidated' | 'onRoleCreate' | 'onRoleDelete' | 'onRoleUpdate' | 'onThreadCreate' | 'onThreadDelete' | 'onThreadListSync' | 'onThreadMemberUpdate' | 'onThreadMembersUpdate' | 'onThreadUpdate' | 'onTypingStart' | 'onUserUpdate' | 'onVoiceStateUpdate' | 'onWebhookUpdate' | 'onWebhooksUpdate' | 'onInteractionCreate' | 'onShardDisconnect' | 'onShardError' | 'onShardReady' | 'onShardReconnecting' | 'onShardResume' | 'onStageInstanceCreate' | 'onStageInstanceUpdate' | 'onStageInstanceDelete' | 'onStickerCreate' | 'onStickerDelete' | 'onStickerUpdate' | 'onGuildScheduledEventCreate' | 'onGuildScheduledEventUpdate' | 'onGuildScheduledEventDelete' | 'onGuildScheduledEventUserAdd' | 'onGuildScheduledEventUserRemove' | 'onTimeout' | 'onInterval';
interface BDJSCustomEvents {
    interval: (data: Record<string, any>) => void;
    shardCreate: (shard: Shard) => void;
    timeout: (data: Record<string, any>) => void;
}
declare function BDJSDefaultOptions(auth: `${string}.${string}.${string}`, prefixes: string[]): void | BDJSOptions;
export { ActivityType, ApplicationCommandType, ApplicationCommandOptionType, BaseFunction, BDJSCustomEvents, BDJSDefaultOptions, BDJSLog, BDJSOptions, Bot, CommandData, ContextMenuCommandBuilder, Data, Plugin, SlashCommandBuilder, VariableManager };
