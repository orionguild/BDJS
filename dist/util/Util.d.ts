import { Guild, GuildBasedChannel, GuildTextBasedChannel, PermissionsString, Snowflake, User } from 'discord.js';
import { Bot } from 'src/structures/Bot';
export declare class Util {
    /**
     * Check if the provided string is bigint.
     * @param {string} data - The string to test.
     */
    static isBigInt(data: string): boolean;
    /**
     * Parses string to its native type.
     * @param {string} text The string to parse.
     */
    static parse(text: string): undefined | null | number | BigInt | Object | string;
    /**
     * Validates all provided permissions names.
     * @param permissions - Permission names.
     * @returns {boolean}
     */
    static validatePermissions(...permissions: PermissionsString[]): boolean;
    /**
     * Sleep the remaining code for the given time.
     * @param time - Time to sleep the code.
     */
    static sleep(time: number): Promise<unknown>;
    /**
     * Get a guild automoderation rule.
     * @param guild - Guild to get the rule from.
     * @param query - Rule resolver.
     */
    static getAutomodRule(guild: Guild, query: string): Promise<import("discord.js").AutoModerationRule | null>;
    /**
     * Get a guild channel.
     * @param {string} query - Channel resolver.
     * @param {Guild} guild - The guild where channel is in.
     */
    static getChannel<T = GuildBasedChannel>(query: string, guild: Guild): Promise<T | null>;
    /**
     * Get a guild member.
     * @param {string} query - Member resolver.
     * @param {Guild} guild - The guild where member is in.
     * @returns {Promise<GuildMember | null>}
     */
    static getMember(query: string, guild: Guild): Promise<import("discord.js").GuildMember | null>;
    /**
     * Get a message.
     * @param channel - Channel to get the message from.
     * @param query - Message ID.
     * @returns {Promise<Message<true> | null>}
     */
    static getMessage(channel: GuildTextBasedChannel, query: string): Promise<import("discord.js").Message<true> | null>;
    /**
     * Get a guild role.
     * @param {string} query - Role resolver.
     * @param {Guild} guild - The guild where role is in.
     * @returns {Promise<Role | null>}
     */
    static getRole(query: string, guild: Guild): Promise<import("discord.js").Role | null>;
    /**
     * Get an user.
     * @param bot - BDJS client.
     * @param id - User ID.
     * @param strict - Set to "true" if id is resolvable.
     * @returns {Promise<User | null>}
     */
    static getUser(bot: Bot, id: Snowflake, strict?: boolean): Promise<User | null>;
    /**
     * Check if the provided usar has its DM channel open.
     * @param bot - BDJS client.
     * @param user - User to be checked.
     * @returns {Promise<boolean>}
     */
    static hasDM(bot: Bot, user: string | User): Promise<boolean>;
    /**
     * Generates the "camelized version" of a text.
     * @param text - The text to be camelized.
     */
    static camelCase(text: string): string;
}
