/**
 * BDJS util class.
 */
class Util {
    /**
     * Clones the given data.
     * @template T
     * @param {T} data - The data to clone.
     * @returns {T} The cloned data.
    */
    static clone(data) {
        if (data instanceof Map)
            return new Map(data)
        else if (data instanceof WeakMap)
            return new WeakMap(data)
        else if (data instanceof Set)
            return new Set(data)
        else if (data instanceof WeakSet)
            return new WeakSet(data)
        else if (data instanceof Date)
            return new Date(data)
        else if (data instanceof RegExp)
            return new RegExp(data)
        else if (data instanceof Array)
            return new Array(data)
    }

    /**
     * Check if the provided string is bigint.
     * @param {string} data - The string to test.
     * @returns {boolean} Return whether is BigInt or not.
     */
    static isBigInt(data) {
        return /-?0x[0-9a-fA-F]+n|-?0o[0-7]+n|-?0b[01]+n|-?[0-9]+n/g.text(data)
    }

    /**
     * Parses string to its native type.
     * @param {string} text The string to parse.
     * @returns {string | number | boolean | null | undefined | Record<any, any> | unknown[] | BigInt}
     */
    static parse(text) {
        if (text === undefined) return undefined
        else if (text === null) return null
        
        text = text.trim()

        if (text === 'undefined') return undefined
        else if (text === 'null') return null
        else if (isNaN(Number(text)) && Number.isSafeInteger(text))
            return Number(text)
        else if (text.endsWith('n') && this.isBigInt(text))
            return new BigInt(text.replace('n', ''))
        else {
            try {
                return JSON.parse(text)
            } catch {
                return text
            }
        }
    }

    /**
     * Get a guild channel.
     * @param {string} query - Channel resolver.
     * @param {import('discord.js').Guild} guild - The guild where channel is in.
     * @returns {Promise<import('discord.js').TextBasedChannel | null>}
     */
    static async getChannel(query, guild) {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        let channel = someId ? guild.channels.cache.get(someId) || (await guild.channels.fetch(someId).catch(e => null)) : null
        if (!channel) channel = guild.channels.cache.find(c => c.name.includes(query)) || null
        return channel
    }

    /**
     * Get a guild member.
     * @param {string} query - Member resolver.
     * @param {import('discord.js').Guild} guild - The guild where member is in.
     * @returns {Promise<import('discord.js').GuildMember | null>}
     */
    static async getMember(query, guild) {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        let member = someId ? guild.members.cache.get(someId) || (await guild.members.fetch(someId).catch(e => null)) : null
        if (!member) member = guild.members.cache.find(m => m.user.username.includes(query)) || null
        return member
    }

    /**
     * Get a guild role.
     * @param {string} query - Role resolver.
     * @param {import('discord.js').Guild} guild - The guild where role is in.
     * @returns {Promise<import('discord.js').Role | null>}
     */
    static async getRole(query, guild) {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        let role = someId ? guild.roles.cache.get(someId) || (await guild.roles.fetch(someId).catch(e => null)) : null
        if (!role) role = guild.roles.cache.find(r => r.name.includes(query)) || null
        return role
    }
}

module.exports = { Util }