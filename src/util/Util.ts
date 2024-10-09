import { Guild, GuildBasedChannel, GuildTextBasedChannel, PermissionsBitField, PermissionsString, Snowflake, User } from 'discord.js'
import { Bot } from 'src/structures/Bot'

export class Util {
    /**
     * Check if the provided string is bigint.
     * @param {string} data - The string to test.
     */
    static isBigInt(data: string) {
        return /-?0x[0-9a-fA-F]+n|-?0o[0-7]+n|-?0b[01]+n|-?[0-9]+n/g.test(data)
    }

    /**
     * Parses string to its native type.
     * @param {string} text The string to parse.
     */
    static parse(text: string): undefined | null | number | bigint | object | string {
        if (text === undefined) return undefined
        else if (text === null) return null
        
        text = text.trim()

        if (text === 'undefined') return undefined
        else if (text === 'null') return null
        else if (isNaN(Number(text)) && Number.isSafeInteger(text))
            return Number(text)
        else if (text.endsWith('n') && this.isBigInt(text))
            return BigInt(text.replace('n', ''))
        else {
            try {
                return JSON.parse(text)
            } catch {
                return text
            }
        }
    }

    /*static deepClone<T>(input: T): T {
        if (input === null || typeof input !== 'object') {
            return input
        }
        if (Array.isArray(input)) {
            const newArray = [] as any[]
            for (const item of input) {
                newArray.push(Util.deepClone(item))
            }
            return newArray as T
        }
        if (input instanceof Date) {
            return new Date(input.getTime()) as T
        }
        if (input instanceof RegExp) {
            const flags = (input as any).flags
            return new RegExp(input.source, flags) as T
        }
        if (input instanceof Map) {
            const newMap = new Map()
            for (const [key, value] of input) {
                newMap.set(Util.deepClone(key), Util.deepClone(value))
            }
            return newMap as T
        }
        if (input instanceof Set) {
            const newSet = new Set()
            for (const value of input) {
                newSet.add(Util.deepClone(value))
            }
            return newSet as T
        }      
        // Handle custom classes or objects
        if (typeof input === 'object') {
            const newObject: Record<string, any> = {}
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    newObject[key] = Util.deepClone(input[key])
                }
            }
            return newObject as T
        }
        // If the type is not handled, return the input as is
        return input;
    }*/

    /**
     * Validates all provided permissions names.
     * @param permissions - Permission names.
     * @returns {boolean}
     */
    static validatePermissions(...permissions: PermissionsString[]) {
        const validPermissions = Object.keys(PermissionsBitField.Flags)
        return permissions.every(t => validPermissions.includes(t))
    }

    /**
     * Sleep the remaining code for the given time.
     * @param time - Time to sleep the code.
     */
    static async sleep(time: number) {
        return new Promise(res => setTimeout(res, time))
    }

    /**
     * Handles an .catch statement.
     * @returns {null}
     */
    static noop() {
        return null
    }

    /**
     * Get a guild automoderation rule.
     * @param guild - Guild to get the rule from.
     * @param query - Rule resolver.
     */
    static async getAutomodRule(guild: Guild, query: string) {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        let rule = someId ? guild.autoModerationRules.cache.get(someId) || (await guild.autoModerationRules.fetch(someId).catch(Util.noop)) : null
        if (!rule) rule = guild.autoModerationRules.cache.find(c => c.name.includes(query)) || null
        return rule
    }

    /**
     * Get a guild channel.
     * @param {string} query - Channel resolver.
     * @param {Guild} guild - The guild where channel is in.
     */
    static async getChannel<T = GuildBasedChannel>(query: string, guild: Guild): Promise<T | null> {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        let channel = someId ? guild.channels.cache.get(someId) || (await guild.channels.fetch(someId).catch(Util.noop)) : null
        if (!channel) channel = guild.channels.cache.find(c => c.name.includes(query)) || null
        return channel as T
    }

    /**
     * Get a guild member.
     * @param {string} query - Member resolver.
     * @param {Guild} guild - The guild where member is in.
     * @returns {Promise<GuildMember | null>}
     */
    static async getMember(query: string, guild: Guild) {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        let member = someId ? guild.members.cache.get(someId) || (await guild.members.fetch(someId).catch(Util.noop)) : null
        if (!member) member = guild.members.cache.find(m => m.user.username.includes(query)) || null
        return member
    }

    /**
     * Get a message.
     * @param channel - Channel to get the message from.
     * @param query - Message ID.
     * @returns {Promise<Message<true> | null>}
     */
    static async getMessage(channel: GuildTextBasedChannel, query: string) {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        const message = someId ? channel.messages.cache.get(someId) || (await channel.messages.fetch(someId).catch(Util.noop)) : null
        return message
    }

    /**
     * Get a guild role.
     * @param {string} query - Role resolver.
     * @param {Guild} guild - The guild where role is in.
     * @returns {Promise<Role | null>}
     */
    static async getRole(query: string, guild: Guild) {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        let role = someId ? guild.roles.cache.get(someId) || (await guild.roles.fetch(someId).catch(Util.noop)) : null
        if (!role) role = guild.roles.cache.find(r => r.name.includes(query)) || null
        return role
    }

    /**
     * Get an user.
     * @param bot - BDJS client.
     * @param id - User ID.
     * @param strict - Set to "true" if id is resolvable.
     * @returns {Promise<User | null>}
     */
    static async getUser(bot: Bot, id: Snowflake, strict: boolean = false) {
        if(!id) return null
        const some_id = id.replace(/[^\d]/g, '')
        let user = some_id ? (bot.users.cache.get(some_id)) || (await bot.users.fetch(some_id).catch(Util.noop)): null
        if(!strict && !user) user = (bot.users.cache.find(u => u.username.includes(id)) || null)
        return user
    }

    /**
     * Check if the provided usar has its DM channel open.
     * @param bot - BDJS client.
     * @param user - User to be checked.
     * @returns {Promise<boolean>}
     */
    static async hasDM(bot: Bot, user: string | User): Promise<boolean> {
        const u = user instanceof User ? user: (await this.getUser(bot, user, false))
        if(!u) return false
        const c = await u.send(' ').catch(err => err.code)
        return c === 50007 ? false : true
    }

    /**
     * Generates the "camelized version" of a text.
     * @param text - The text to be camelized.
     */
    static camelCase(text: string) {
        return text.split(/ +/g)
            .map((t, i) => i === 0 
                ? t.toLowerCase() : t[0].toUpperCase().concat(t.slice(1).toLowerCase())
            )
            .join('')
    }
}