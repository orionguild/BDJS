import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check if the provided member has a role.',
    parameters: [],
    code: async (d, [roleID, memberID = d.ctx?.user?.id, guildID = d.ctx?.guild?.id]) => {
        if (roleID === undefined) throw new d.error(d, 'required', 'Role ID', d.function?.name!)
        if (memberID === undefined) throw new d.error(d, 'invalid', 'Member ID', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const role = await d.util.getRole(roleID, guild)
        if (!role) throw new d.error(d, 'invalid', 'Role ID', d.function?.name!)

        const member = await d.util.getMember(memberID, guild)
        if (!member) throw new d.error(d, 'invalid', 'Member ID', d.function?.name!)

        return member.roles.cache.has(roleID)
    }
})