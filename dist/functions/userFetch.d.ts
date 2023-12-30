import { BaseFunction } from '../structures/Function';
import { User } from 'discord.js';
export declare enum UserProperties {
    isBot = "isBot",
    avatar = "avatar",
    id = "id",
    username = "username",
    displayName = "displayName",
    globalName = "globalName",
    banner = "banner",
    accentColor = "accentColor",
    timestamp = "timestamp",
    dmChannelID = "dmChannelID"
}
export declare const isValidUserProperty: (property: UserProperties) => boolean;
export declare function getUserProperty(user: User & Record<string, any>, property: UserProperties): string | number | null | undefined;
declare const _default: BaseFunction;
export default _default;
