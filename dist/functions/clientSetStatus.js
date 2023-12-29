"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Function_1 = require("../structures/Function");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
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
    code: async function (d, [text, type = 'playing', status = 'online', url, afk = 'false']) {
        if (text === undefined)
            throw new d.error(d, 'required', 'URL', d.function?.name);
        if (!['online', 'idle', 'dnd', 'invisible'].includes(status.toLowerCase()))
            throw new d.error(d, 'invalid', 'status', d.function?.name);
        const activityTypes = {
            competing: discord_js_1.ActivityType.Competing,
            custom: discord_js_1.ActivityType.Custom,
            listening: discord_js_1.ActivityType.Listening,
            playing: discord_js_1.ActivityType.Playing,
            streaming: discord_js_1.ActivityType.Streaming,
            watching: discord_js_1.ActivityType.Watching
        };
        if (!Object.keys(activityTypes).includes(type.toLowerCase()))
            throw new d.error(d, 'invalid', 'activity type', d.function?.name);
        try {
            d.bot?.user.setPresence({
                activities: [{
                        name: text,
                        state: type === 'custom' ? text : undefined,
                        type: activityTypes[type.toLowerCase()],
                        url
                    }],
                afk: afk === 'true',
                status: status
            });
        }
        catch (e) {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e));
        }
    }
});
