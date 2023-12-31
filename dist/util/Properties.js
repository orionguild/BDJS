"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Member: {
        avatar: {
            description: 'Retrieves the avatar of this guild member.',
            code: (m) => m.displayAvatarURL()
        },
        banner: {
            description: 'Retrieves the avatar of this guild member.',
            code: (m) => m.user.bannerURL()
        },
        displayname: {
            description: 'The displayed name of this member.',
            code: (m) => m.displayName
        },
        dmchannelid: {
            description: 'The channel ID of this member\'s DM.',
            code: (m) => m.dmChannel?.id
        },
        guildid: {
            description: 'The guild this member is in.',
            code: (m) => m.guild.id
        },
        hexcolor: {
            description: 'The user\'s highest role hexadecimal color.',
            code: (m) => m.displayHexColor
        },
        highestroleid: {
            description: 'The ID of the highest role of this member.',
            code: (m) => m.roles.highest.id
        },
        id: {
            description: 'Guild member ID.',
            code: (m) => m.id
        },
        isbannable: {
            description: 'Whether this guild member is bannable.',
            code: (m) => m.bannable
        },
        isbot: {
            description: 'Whether this guild member is bot.',
            code: (m) => m.user.bot
        },
        iskickable: {
            description: 'Whether this guild member is kickable.',
            code: (m) => m.kickable
        },
        ismanageable: {
            description: 'Whether this guild member is manageable.',
            code: (m) => m.manageable
        },
        ismoderable: {
            description: 'Whether this guild member is moderable.',
            code: (m) => m.moderatable
        },
        ismuted: {
            description: 'Whether this guild member is muted.',
            code: (m) => m.isCommunicationDisabled()
        },
        ispending: {
            description: 'Whether this guild member is pending.',
            code: (m) => m.pending
        },
        joinedtimestamp: {
            description: 'The time this member joined the server, in milliseconds.',
            code: (m) => m.joinedTimestamp
        },
        nickname: {
            description: 'The nickname of this member.',
            code: (m) => m.nickname
        },
        permissions: {
            description: 'Join all permission this member has.',
            code: (m) => m.permissions.toArray().join(',')
        },
        roles: {
            description: 'Join all role IDs this member has.',
            code: (m) => m.roles.cache.map(role => role.id).join(',')
        },
        voicechannelid: {
            description: 'The voice channel ID of this member, if any.',
            code: (m) => m.voice.channel?.id
        },
    }
};
