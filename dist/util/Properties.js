"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    Bot: {
        avatar: {
            description: 'Retrieves the avatar of the client.',
            code: b => b.user.displayAvatarURL()
        },
        botcount: {
            description: 'Total amount of cached bots.',
            code: b => b.users.cache.filter(u => u.bot).size
        },
        channelcount: {
            description: 'Total amount of channels.',
            code: b => b.guilds.cache.map(t => t.channels.cache.size).reduce((a, b) => a + b).toString()
        },
        commands: {
            description: 'Retrieves all loaded command names.',
            code: b => Array.from(b.commands.values()).filter(cmd => cmd.name).join(',')
        },
        emojicount: {
            description: 'Total amount of emojis.',
            code: b => b.guilds.cache.map(t => t.emojis.cache.size).reduce((a, b) => a + b).toString()
        },
        globalcommands: {
            description: 'Retrieves all synced application command names.',
            code: b => {
                return b.application.commands.fetch().then((cmds) => {
                    return Array.from(cmds.values()).map(x => x.id).join(',');
                });
            }
        },
        guildcount: {
            description: 'Total amount of guilds.',
            code: b => b.guilds.cache.size.toString()
        },
        id: {
            description: 'Client ID.',
            code: b => b.user.id
        },
        token: {
            description: 'Returns the client token.',
            code: b => b.token
        },
        owners: {
            description: 'The owner IDs of this client.',
            code: b => {
                return b.application.fetch().then((app) => {
                    if (app.owner instanceof discord_js_1.User) {
                        return app.owner.id;
                    }
                    else
                        return app.owner?.members.map(t => t.id).join(',');
                });
            }
        },
        usercount: {
            description: 'Total amount of users.',
            code: b => b.guilds.cache.map(t => t.memberCount).reduce((a, b) => a + b).toString()
        },
        uptime: {
            description: 'The client connection time, in milliseconds.',
            code: b => b.uptime
        },
        username: {
            description: 'The username of the client.',
            code: b => b.user.username
        }
    },
    Channel: {
        bitrate: {
            description: 'The channel bitrate.',
            code: c => c.isVoiceBased() ? c.bitrate : undefined
        },
        createdtimestamp: {
            description: 'The time this channel was created, in milliseconds.',
            code: c => c.createdTimestamp
        },
        id: {
            description: 'The channel ID.',
            code: c => c.id
        },
        isdeletable: {
            description: 'Whether this channel is deletable.',
            code: c => c.deletable
        },
        isfull: {
            description: 'Whether this channel is full.',
            code: c => c.isVoiceBased() ? c.full : undefined
        },
        ismanageable: {
            description: 'Whether this channel is manageable.',
            code: c => c.manageable
        },
        isnsfw: {
            description: 'Whether this channel is NSFW.',
            code: c => c.nsfw
        },
        isviewable: {
            description: 'Whether this channel is viewable.',
            code: c => c.viewable
        },
        isjoinable: {
            description: 'Whether this channel is joinable.',
            code: c => c.isVoiceBased() ? c.joinable : undefined
        },
        lastmessageid: {
            description: 'ID of the last message sent in this channel.',
            code: c => c.lastMessageId
        },
        name: {
            description: 'The name of this channel.',
            code: c => c.name
        },
        parentid: {
            description: 'The ID of the parent channel.',
            code: c => c.parentId
        },
        parentname: {
            description: 'The name of the parent channel.',
            code: c => c.parent?.name
        },
        position: {
            description: 'The position this channel has.',
            code: c => c.position
        },
        slowmode: {
            description: 'The ratelimit per user in this channel.',
            code: c => c.rateLimitPerUser
        },
        rawposition: {
            description: 'The raw position this channel has.',
            code: c => c.rawPosition
        },
        threads: {
            description: 'A list of threads in this channel.',
            code: c => c.type === discord_js_1.ChannelType.GuildText ? c.threads.cache.map(x => x.name).join(',') : undefined
        },
        topic: {
            description: 'The topic of this channel.',
            code: c => c.type === discord_js_1.ChannelType.GuildText ? c.topic : undefined
        },
        type: {
            description: 'The channel type.',
            code: c => c.type
        },
        userlimit: {
            description: 'The user limit for this voice channel.',
            code: c => c.isVoiceBased() ? c.userLimit.toString() : undefined
        },
        url: {
            description: 'The URL of this channel.',
            code: c => c.url
        },
        videoqualitymode: {
            description: 'The video quality mode for this voice channel.',
            code: c => c.isVoiceBased() ? c.videoQualityMode?.toString() : undefined
        }
    },
    Guild: {
        afkchannelid: {
            description: 'The AFK channel ID of this guild.',
            code: g => g.afkChannelId
        },
        afktimeout: {
            description: 'The guild\'s AFK timeout.',
            code: g => g.afkTimeout
        },
        available: {
            description: 'Whether this guild is available to access.',
            code: g => g.available
        },
        bans: {
            description: 'Join all user IDs banned in this guild.',
            code: g => g.bans.cache.map(x => x.user.id).join(',')
        },
        channels: {
            description: 'Join all channel IDs in this guild.',
            code: g => g.channels.cache.map(x => x.id).join(',')
        },
        commands: {
            description: 'Returns all the application command IDs for this guild.',
            code: g => {
                return g.commands.fetch().then((cmds) => {
                    return cmds.map(cmd => cmd.id).join(',');
                });
            }
        },
        defaultmessagenotification: {
            description: 'Returns this guild\'s default message notifications setting.',
            code: g => g.defaultMessageNotifications.toString()
        },
        description: {
            description: 'This guild description.',
            code: g => g.description
        },
        emojis: {
            description: 'Join all emojis IDs in this guild.',
            code: g => g.emojis.cache.map(x => x.id).join(',')
        },
        explicitcontentfilter: {
            description: 'This guild explicit content filter.',
            code: g => g.explicitContentFilter.toString()
        },
        features: {
            description: 'Return all guild features.',
            code: g => g.features.join(',')
        },
        id: {
            description: 'Guild\'s ID.',
            code: g => g.id
        },
        ispartnered: {
            description: 'Whether guild is partnered.',
            code: g => g.partnered
        },
        isverified: {
            description: 'Whether this guild is verified by Discord.',
            code: g => g.verified
        },
        iswidgetenabled: {
            description: 'Whether guild widget is enabled.',
            code: g => g.widgetEnabled
        },
        members: {
            description: 'Join all member IDs in this guild.',
            code: g => g.emojis.cache.map(x => x.id).join(',')
        },
        memberCount: {
            description: 'Return the member count in this guild.',
            code: g => g.memberCount
        },
        mfalevel: {
            description: 'This guild\'s MFA level.',
            code: g => g.mfaLevel.toString()
        },
        name: {
            description: 'The name of this guild.',
            code: g => g.name
        },
        ownerid: {
            description: 'The ID of the guild\'s owner.',
            code: g => g.ownerId
        },
        preferredlocale: {
            description: 'This guild preferred locale.',
            code: g => g.preferredLocale.toString()
        },
        premiumsubscriptioncount: {
            description: 'This guild\'s boost count.',
            code: g => g.premiumSubscriptionCount
        },
        premiumtier: {
            description: 'This guild\'s boost count.',
            code: g => g.premiumTier.toString()
        },
        publicupdateschannelid: {
            description: 'This guild\'s public updates channel ID.',
            code: g => g.publicUpdatesChannelId
        },
        roles: {
            description: 'Join all role IDs in this guild.',
            code: g => g.roles.cache.map(x => x.id).join(',')
        },
        ruleschannelid: {
            description: 'This guild\'s rules channel ID.',
            code: g => g.rulesChannelId
        },
        systemchannelid: {
            description: 'This guild\'s system channel ID.',
            code: g => g.systemChannelId
        },
        verificationlevel: {
            description: 'This guild\'s verification level.',
            code: g => g.verificationLevel.toString()
        },
        widgetchannelid: {
            description: 'This guild\'s widget channel ID.',
            code: g => g.widgetChannelId
        }
    },
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
    },
    Message: {
        authorid: {
            description: 'Retrieves the author ID of this message.',
            code: m => m.author?.id
        },
        content: {
            description: 'Retrieves the content of this message.',
            code: m => m.content
        },
        createdtimestamp: {
            description: 'The time this message was created, in milliseconds.',
            code: m => m.createdTimestamp
        },
        editedtimestamp: {
            description: 'The time this message was edited, in milliseconds.',
            code: m => m.editedTimestamp
        },
        hasthread: {
            description: 'Whether this message has threads.',
            code: m => m.hasThread
        },
        id: {
            description: 'Retrieves the ID of this message.',
            code: m => m.id
        },
        iscrossportable: {
            description: 'Whether this message is crossportable.',
            code: m => m.crosspostable
        },
        isdeletable: {
            description: 'Whether this message is deletable.',
            code: m => m.deletable
        },
        iseditable: {
            description: 'Whether this message is editable.',
            code: m => m.editable
        },
        ispinnable: {
            description: 'Whether this message is pinnable.',
            code: m => m.pinnable
        },
        ispinned: {
            description: 'Whether this message is pinned.',
            code: m => m.pinned
        },
        isthread: {
            description: 'Whether this message is thread.',
            code: m => m.thread
        },
        position: {
            description: 'Returns the position of this message.',
            code: m => m.position
        },
        reactions: {
            description: 'Join all message reactions IDs.',
            code: m => m.reactions.cache.map(x => x.emoji.id).join(',')
        },
        reference: {
            description: 'Retrieves the message reference ID.',
            code: m => m.reference?.messageId
        },
        type: {
            description: 'Retrieves the message type.',
            code: m => m.type
        },
        url: {
            description: 'Retrieves the URL of this message.',
            code: m => m.url
        }
    },
    Role: {
        createdtimestamp: {
            description: 'The time this role was created, in milliseconds.',
            code: (r) => r.createdTimestamp
        },
        hexcolor: {
            description: 'Color this role has, as hexadecimal.',
            code: (r) => r.hexColor
        },
        icon: {
            description: 'The icon of this role, if any.',
            code: (r) => r.iconURL()
        },
        id: {
            description: 'Role ID.',
            code: (r) => r.id
        },
        iseditable: {
            description: 'Whether this role is editable.',
            code: (r) => r.editable
        },
        iseveryonerole: {
            description: 'Whether this role is the @everyone role for this guild.',
            code: (r) => r.id === r.guild.id
        },
        ishoisted: {
            description: 'Whether this role is hoisted.',
            code: (r) => r.hoist
        },
        ismanaged: {
            description: 'Whether this role is managed.',
            code: (r) => r.managed
        },
        ismentionable: {
            description: 'Whether this role is mentionable.',
            code: (r) => r.mentionable
        },
        name: {
            description: 'Name this role has.',
            code: (r) => r.name
        },
        members: {
            description: 'Cached member IDs with this role.',
            code: (r) => Array.from(r.members.values()).map(m => m.id).join(',')
        },
        mention: {
            description: 'Returns the role mention.',
            code: (r) => r.toString()
        },
        permissions: {
            description: 'Permission list this role has.',
            code: (r) => r.permissions.toArray().join(',')
        },
        position: {
            description: 'This role position.',
            code: (r) => r.position
        },
        rawposition: {
            description: 'This role raw position.',
            code: (r) => r.rawPosition
        }
    },
    User: {
        accentcolor: {
            description: 'The user\'s accent hexadecimal color.',
            code: (u) => u.hexAccentColor
        },
        avatar: {
            description: 'Retrieves the avatar of this user.',
            code: (u) => u.displayAvatarURL()
        },
        avatardecoration: {
            description: 'Retrieves the avatar decoration of this user, if any.',
            code: (u) => u.avatarDecorationURL()
        },
        banner: {
            description: 'Retrieves the banner of this user.',
            code: (u) => u.bannerURL()
        },
        createdtimestamp: {
            description: 'The time this user created its account, in milliseconds.',
            code: (u) => u.createdTimestamp
        },
        displayname: {
            description: 'The displayed name of this user.',
            code: (u) => u.displayName
        },
        dmchannelid: {
            description: 'The channel ID of this user\'s DM.',
            code: (u) => u.dmChannel?.id
        },
        id: {
            description: 'User ID.',
            code: (u) => u.id
        },
        globalname: {
            description: 'The global name this user has.',
            code: (u) => u.globalName
        },
        username: {
            description: 'The username this user has.',
            code: (u) => u.username
        }
    }
};
