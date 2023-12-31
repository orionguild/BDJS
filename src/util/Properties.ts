import { GuildMember, PartialGuildMember } from "discord.js";

type Member = GuildMember | PartialGuildMember

export default {
    Member: {
        displayname: {
            description: 'The displayed name of this member.',
            code: (m: Member) => m.displayName
        },
        guildid: {
            description: 'The guild this member is in.',
            code: (m: Member) => m.guild.id
        },
        hexcolor: {
            description: 'The user\'s highest role hexadecimal color.',
            code: (m: Member) => m.displayHexColor
        },
        highestroleid: {
            description: 'The ID of the highest role of this member.',
            code: (m: Member) => m.roles.highest.id
        },
        id: {
            description: 'Guild member ID.',
            code: (m: Member) => m.id
        },
        isbannable: {
            description: 'Whether this guild member is bannable.',
            code: (m: Member) => m.bannable
        },
        isbot: {
            description: 'Whether this guild member is bot.',
            code: (m: Member) => m.user.bot
        },
        iskickable: {
            description: 'Whether this guild member is kickable.',
            code: (m: Member) => m.kickable
        },
        joinedtimestamp: {
            description: 'The time this member joined the server, in milliseconds.',
            code: (m: Member) => m.joinedTimestamp
        },
        nickname: {
            description: 'The nickname of this member.',
            code: (m: Member) => m.nickname
        },
        permissions: {
            description: 'Join all permission this member has.',
            code: (m: Member) => m.permissions.toArray().join(',')
        },
        roles: {
            description: 'Join all role IDs this member has.',
            code: (m: Member) => m.roles.cache.map(role => role.id).join(',')
        },
        voicechannelid: {
            description: 'The voice channel ID of this member, if any.',
            code: (m: Member) => m.voice.channel?.id
        },
    } as Record<string, {
        description: string,
        code: (member: Member) => any
    }>
}