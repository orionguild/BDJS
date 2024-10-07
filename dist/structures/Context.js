"use strict";
var _Context_instances, _Context_hold, _Context_setMessage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const tslib_1 = require("tslib");
// @ts-nocheck
const discord_js_1 = require("discord.js");
/**
 * Look-up for a valid context instance.
 * @param data - Context to be checked.
 * @returns {boolean}
 */
function isValidInstance(data) {
    const classes = [discord_js_1.TextChannel, discord_js_1.ThreadChannel, discord_js_1.StageChannel, discord_js_1.NewsChannel, discord_js_1.User];
    return classes.some(cl => data instanceof cl);
}
/**
 * Represents a context class.
 */
class Context {
    constructor(data, client) {
        _Context_instances.add(this);
        _Context_hold.set(this, void 0);
        this.client = client;
        this.raw = data.raw;
        tslib_1.__classPrivateFieldSet(this, _Context_hold, null, "f");
        this.author = data.author ?? null;
        this.channel = data.channel ?? null;
        this.interaction = data.interaction ?? null;
        this.guild = data.guild ?? null;
        this.member = data.member ?? null;
        this.message = data.message ?? tslib_1.__classPrivateFieldGet(this, _Context_hold, "f");
    }
    /**
     * Defers the message response.
     * @param ephemeral - Whether message should be sent as ephemeral. (INTERACTION-ONLY)
     * @param [fetchReply=false] - Whether fetch original response.
     */
    async defer(ephemeral = false, fetchReply = false) {
        if (this.raw instanceof discord_js_1.CommandInteraction) {
            return await this.raw.deferReply({ ephemeral, fetchReply });
        }
        else if (this.raw instanceof discord_js_1.MessageComponentInteraction) {
            return await this.raw.deferUpdate({ fetchReply });
        }
        else if (this.channel && 'sendTyping' in this.channel) {
            return await this.channel.sendTyping().catch((e) => null);
        }
    }
    /**
     * Edit the response was sent.
     * @param options - Message edit options.
     */
    async edit(options) {
        if (this.interaction instanceof discord_js_1.CommandInteraction) {
            return await this.interaction.editReply(options);
        }
        else if (this.interaction instanceof discord_js_1.MessageComponentInteraction) {
            return await this.interaction.update(options);
        }
        else if (tslib_1.__classPrivateFieldGet(this, _Context_hold, "f") instanceof discord_js_1.Message) {
            return await tslib_1.__classPrivateFieldGet(this, _Context_hold, "f").edit(options);
        }
        else
            return null;
    }
    /**
     * Follow up a message response.
     * @param options - Message payload to be sent.
     */
    async followUp(options) {
        if (this.interaction instanceof discord_js_1.CommandInteraction) {
            return await this.interaction.followUp(options);
        }
        else if (this.interaction instanceof discord_js_1.MessageComponentInteraction) {
            return await this.interaction.reply(options);
        }
        else if (tslib_1.__classPrivateFieldGet(this, _Context_hold, "f") instanceof discord_js_1.Message) {
            return await tslib_1.__classPrivateFieldGet(this, _Context_hold, "f").reply(options);
        }
        else
            return null;
    }
    /**
     * Sends a message using the possible channel.
     * @param payload - Message payload to be sent.
     */
    async send(payload) {
        if (this.raw instanceof discord_js_1.ChatInputCommandInteraction) {
            const reply = await this.raw.reply(payload);
            if (typeof payload !== 'string'
                &&
                    payload.fetchReply)
                tslib_1.__classPrivateFieldGet(this, _Context_instances, "m", _Context_setMessage).call(this, reply);
            return reply;
        }
        else if (this.raw instanceof discord_js_1.MessageComponentInteraction) {
            const reply = await this.raw.reply(payload);
            tslib_1.__classPrivateFieldGet(this, _Context_instances, "m", _Context_setMessage).call(this, reply);
            return reply;
        }
        else if (this.raw instanceof discord_js_1.ModalSubmitInteraction) {
            const reply = await this.raw.reply(payload);
            tslib_1.__classPrivateFieldGet(this, _Context_instances, "m", _Context_setMessage).call(this, reply);
            return reply;
        }
        else if (this.raw instanceof discord_js_1.Message) {
            const reply = await this.raw.channel.send(payload);
            tslib_1.__classPrivateFieldGet(this, _Context_instances, "m", _Context_setMessage).call(this, reply);
            return reply;
        }
        else if (isValidInstance(this.raw)) {
            const reply = await this.raw.send(payload);
            tslib_1.__classPrivateFieldGet(this, _Context_instances, "m", _Context_setMessage).call(this, reply);
            return reply;
        }
        else if (this.raw instanceof discord_js_1.GuildMember) {
            const reply = await this.raw.user.send(payload);
            tslib_1.__classPrivateFieldGet(this, _Context_instances, "m", _Context_setMessage).call(this, reply);
            return reply;
        }
        else
            return null;
    }
}
exports.Context = Context;
_Context_hold = new WeakMap(), _Context_instances = new WeakSet(), _Context_setMessage = function _Context_setMessage(msg) {
    tslib_1.__classPrivateFieldSet(this, _Context_hold, msg, "f");
};
