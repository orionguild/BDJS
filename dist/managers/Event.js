"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const Bot_1 = require("../structures/Bot");
const Event_1 = require("../structures/Event");
const promises_1 = require("fs/promises");
const BDJSLog_1 = require("../util/BDJSLog");
const path_1 = require("path");
class EventManager extends Map {
    /**
     * Load events from a directory.
     * @param bot - BDJS client.
     */
    async loadNatives(bot) {
        const root = __dirname.replace('managers', 'events');
        const files = await (0, promises_1.readdir)(root);
        for (const file of files) {
            if (file.endsWith('.js')) {
                if (file === 'error.js' || file === 'ready.js')
                    continue;
                const event = require((0, path_1.join)(root, file)).default;
                if (event instanceof Event_1.BaseEvent
                    &&
                        bot.extraOptions.events.includes(event.name)) {
                    bot[event.once === true ? 'once' : 'on']((0, Bot_1.reformulateEvents)([event.name], 'DJS').join(''), async (...args) => {
                        await event.listener(bot, ...args);
                    });
                    delete require.cache[(0, path_1.join)(root, file)];
                    if (bot.extraOptions.debug === true)
                        BDJSLog_1.BDJSLog.debug(`"${event.name}" is being listened.`);
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
        ];
    }
    /**
     * Return BDJS event names as string.
     */
    get reformulatedNames() {
        return (0, Bot_1.reformulateEvents)(this.names, 'BDJS');
    }
}
exports.EventManager = EventManager;
