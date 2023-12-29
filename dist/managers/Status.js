"use strict";
var _StatusManager_data, _StatusManager_bot;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusManager = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Util_1 = require("../util/Util");
const BDJSLog_1 = require("../util/BDJSLog");
const ms_1 = tslib_1.__importDefault(require("ms"));
class StatusManager {
    constructor(bot) {
        _StatusManager_data.set(this, void 0);
        _StatusManager_bot.set(this, void 0);
        tslib_1.__classPrivateFieldSet(this, _StatusManager_bot, bot, "f");
        tslib_1.__classPrivateFieldSet(this, _StatusManager_data, new discord_js_1.Collection, "f");
    }
    /**
     * Add a status data to the manager.
     * @param status - Array of status objects.
     * @returns {StatusManager}
     */
    add(...status) {
        for (const data of status) {
            let { text, type = discord_js_1.ActivityType.Playing, status = 'online', time = 10000 } = data;
            if (!text) {
                BDJSLog_1.BDJSLog.error('Missing status text!');
                break;
            }
            else if (typeof time !== 'string' && typeof time !== 'number') {
                BDJSLog_1.BDJSLog.error('Invalid status time provided!');
                break;
            }
            if (typeof time === 'string')
                time = (0, ms_1.default)(time);
            if (time === null || isNaN(Number(time))) {
                BDJSLog_1.BDJSLog.error('Invalid status time provided!');
                break;
            }
            tslib_1.__classPrivateFieldGet(this, _StatusManager_data, "f").set(tslib_1.__classPrivateFieldGet(this, _StatusManager_data, "f").size.toString(), {
                text, type, status, time
            });
        }
        return this;
    }
    /**
     * Rotates all cached statuses.
     */
    async rotate(d) {
        let i = 0;
        while (true) {
            const data = tslib_1.__classPrivateFieldGet(this, _StatusManager_data, "f").get(i.toString());
            const text = await d.reader.compile(data.text, d);
            tslib_1.__classPrivateFieldGet(this, _StatusManager_bot, "f").user.presence.set({
                activities: [
                    {
                        name: text.code,
                        type: data.type
                    }
                ],
                status: data.status
            });
            await Util_1.Util.sleep(data?.time);
            if (i >= this.size - 1)
                i = 0;
            else
                i++;
        }
    }
    /**
     * Returns the number of cached statuses.
     */
    get size() {
        return tslib_1.__classPrivateFieldGet(this, _StatusManager_data, "f").size;
    }
}
exports.StatusManager = StatusManager;
_StatusManager_data = new WeakMap(), _StatusManager_bot = new WeakMap();
