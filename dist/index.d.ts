import { ActivityType, ApplicationCommandType, ApplicationCommandOptionType, ClientEvents, ContextMenuCommandBuilder, Shard, SlashCommandBuilder } from 'discord.js';
import { VariableManager } from './managers/Variable';
import { BaseFunction } from './structures/Function';
import { BDJSOptions, Bot } from './structures/Bot';
import { CommandData } from './managers/Command';
import { Plugin } from './structures/Plugin';
import { Data } from './structures/Data';
import { BDJSLog } from './util/BDJSLog';
export type CustomCommandTypes = 'interval' | 'timeout';
export type StringCommandTypes = 'always' | 'error' | 'ready' | 'prefixed' | 'unprefixed' | 'anyInteraction' | 'modalInteraction' | 'buttonInteraction' | 'commandInteraction' | 'selectMenuInteraction' | 'userContextMenuInteraction' | 'messageContextMenuInteraction' | 'autocompleteInteraction' | 'memberJoin' | 'memberLeave' | 'memberUpdate' | 'messageDelete' | 'messageUpdate' | 'reactionAdd' | 'reactionRemove' | 'stickerCreate' | 'stickerDelete' | 'stickerUpdate' | 'roleCreate' | 'roleDelete' | 'roleUpdate' | 'botJoin' | 'botLeave' | 'channelCreate' | 'channelDelete' | 'channelUpdate' | 'threadCreate' | 'threadDelete' | 'threadUpdate' | 'banAdd' | 'banRemove' | 'emojiCreate' | 'emojiDelete' | 'emojiUpdate' | 'presenceUpdate' | 'userUpdate' | 'automodRuleCreate' | 'automodRuleDelete' | 'automodRuleUpdate' | 'entitlementCreate' | 'entitlementUpdate' | 'entitlementDelete' | 'typing' | 'unknown' | CustomCommandTypes;
export type StringEventNames = `on${Capitalize<keyof ClientEvents>}` | `on${Capitalize<CustomCommandTypes>}`;
interface BDJSCustomEvents {
    interval: (data: Record<string, any>) => void;
    shardCreate: (shard: Shard) => void;
    timeout: (data: Record<string, any>) => void;
}
declare function BDJSDefaultOptions(auth: `${string}.${string}.${string}`, prefixes: string[]): void | BDJSOptions;
export { ActivityType, ApplicationCommandType, ApplicationCommandOptionType, BaseFunction, BDJSCustomEvents, BDJSDefaultOptions, BDJSLog, BDJSOptions, Bot, CommandData, ContextMenuCommandBuilder, Data, Plugin, SlashCommandBuilder, VariableManager };
