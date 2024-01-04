# Properties
## Activity
|     Property     |                     Description                      |
|------------------|------------------------------------------------------|
| createdtimestamp | The time this activity was created, in milliseconds. |
| name             | The activity's name.                                 |
| details          | The activity details.                                |
| state            | The activity's state.                                |
| type             | The activity's type.                                 |
| url              | The activity's URL.                                  |


## AutomodRule
|  Property   |                       Description                        |
|-------------|----------------------------------------------------------|
| actiontypes | Action types for this automoderation rule ID.            |
| creatorid   | The ID of the user who created this automoderation rule. |
| guildid     | The automoderation rule guild ID.                        |
| id          | The automoderation rule ID.                              |
| isenabled   | Whether automoderation rule is enabled.                  |
| name        | The automoderation rule name.                            |
| triggertype | The automoderation rule trigger type.                    |


## Bot
|    Property    |                   Description                   |
|----------------|-------------------------------------------------|
| avatar         | Retrieves the avatar of the client.             |
| botcount       | Total amount of cached bots.                    |
| channelcount   | Total amount of channels.                       |
| commands       | Retrieves all loaded command names.             |
| emojicount     | Total amount of emojis.                         |
| globalcommands | Retrieves all synced application command names. |
| guildcount     | Total amount of guilds.                         |
| id             | Client ID.                                      |
| token          | Returns the client token.                       |
| owners         | The owner IDs of this client.                   |
| usercount      | Total amount of users.                          |
| uptime         | The client connection time, in milliseconds.    |
| username       | The username of the client.                     |


## Channel
|     Property     |                     Description                     |
|------------------|-----------------------------------------------------|
| bitrate          | The channel bitrate.                                |
| createdtimestamp | The time this channel was created, in milliseconds. |
| id               | The channel ID.                                     |
| isdeletable      | Whether this channel is deletable.                  |
| isfull           | Whether this channel is full.                       |
| ismanageable     | Whether this channel is manageable.                 |
| isnsfw           | Whether this channel is NSFW.                       |
| isviewable       | Whether this channel is viewable.                   |
| isjoinable       | Whether this channel is joinable.                   |
| lastmessageid    | ID of the last message sent in this channel.        |
| name             | The name of this channel.                           |
| parentid         | The ID of the parent channel.                       |
| parentname       | The name of the parent channel.                     |
| position         | The position this channel has.                      |
| slowmode         | The ratelimit per user in this channel.             |
| rawposition      | The raw position this channel has.                  |
| threads          | A list of threads in this channel.                  |
| topic            | The topic of this channel.                          |
| type             | The channel type.                                   |
| userlimit        | The user limit for this voice channel.              |
| url              | The URL of this channel.                            |
| videoqualitymode | The video quality mode for this voice channel.      |


## Emoji
|     Property     |                    Description                    |
|------------------|---------------------------------------------------|
| authorid         | The emoji author ID.                              |
| createdtimestamp | The time this emoji was created, in milliseconds. |
| guildid          | The emoji guild ID.                               |
| id               | The ID for this emoji.                            |
| isanimated       | Whether this emoji is animated.                   |
| isavailable      | Whether this emoji is available.                  |
| isdeletable      | Whether this emoji is deletable.                  |
| ismanaged        | Whether this emoji is managed.                    |
| name             | The name of this emoji.                           |
| url              | The URL for this emoji.                           |


## Guild
|          Property          |                         Description                         |
|----------------------------|-------------------------------------------------------------|
| afkchannelid               | The AFK channel ID of this guild.                           |
| afktimeout                 | The guild's AFK timeout.                                    |
| available                  | Whether this guild is available to access.                  |
| bans                       | Join all user IDs banned in this guild.                     |
| channels                   | Join all channel IDs in this guild.                         |
| commands                   | Returns all the application command IDs for this guild.     |
| defaultmessagenotification | Returns this guild's default message notifications setting. |
| description                | This guild description.                                     |
| emojis                     | Join all emojis IDs in this guild.                          |
| explicitcontentfilter      | This guild explicit content filter.                         |
| features                   | Return all guild features.                                  |
| icon                       | Guild's icon.                                               |
| id                         | Guild's ID.                                                 |
| ispartnered                | Whether guild is partnered.                                 |
| isverified                 | Whether this guild is verified by Discord.                  |
| iswidgetenabled            | Whether guild widget is enabled.                            |
| members                    | Join all member IDs in this guild.                          |
| memberCount                | Return the member count in this guild.                      |
| mfalevel                   | This guild's MFA level.                                     |
| name                       | The name of this guild.                                     |
| ownerid                    | The ID of the guild's owner.                                |
| preferredlocale            | This guild preferred locale.                                |
| premiumsubscriptioncount   | This guild's boost count.                                   |
| premiumtier                | This guild's boost count.                                   |
| publicupdateschannelid     | This guild's public updates channel ID.                     |
| roles                      | Join all role IDs in this guild.                            |
| ruleschannelid             | This guild's rules channel ID.                              |
| systemchannelid            | This guild's system channel ID.                             |
| verificationlevel          | This guild's verification level.                            |
| widgetchannelid            | This guild's widget channel ID.                             |


## Member
|    Property     |                       Description                        |
|-----------------|----------------------------------------------------------|
| avatar          | Retrieves the avatar of this guild member.               |
| banner          | Retrieves the avatar of this guild member.               |
| displayname     | The displayed name of this member.                       |
| dmchannelid     | The channel ID of this member's DM.                      |
| guildid         | The guild this member is in.                             |
| hexcolor        | The user's highest role hexadecimal color.               |
| highestroleid   | The ID of the highest role of this member.               |
| id              | Guild member ID.                                         |
| isbannable      | Whether this guild member is bannable.                   |
| isbot           | Whether this guild member is bot.                        |
| iskickable      | Whether this guild member is kickable.                   |
| ismanageable    | Whether this guild member is manageable.                 |
| ismoderable     | Whether this guild member is moderable.                  |
| ismuted         | Whether this guild member is muted.                      |
| ispending       | Whether this guild member is pending.                    |
| joinedtimestamp | The time this member joined the server, in milliseconds. |
| nickname        | The nickname of this member.                             |
| permissions     | Join all permission this member has.                     |
| roles           | Join all role IDs this member has.                       |
| voicechannelid  | The voice channel ID of this member, if any.             |


## Message
|     Property     |                     Description                     |
|------------------|-----------------------------------------------------|
| authorid         | Retrieves the author ID of this message.            |
| content          | Retrieves the content of this message.              |
| createdtimestamp | The time this message was created, in milliseconds. |
| editedtimestamp  | The time this message was edited, in milliseconds.  |
| hasthread        | Whether this message has threads.                   |
| id               | Retrieves the ID of this message.                   |
| iscrossportable  | Whether this message is crossportable.              |
| isdeletable      | Whether this message is deletable.                  |
| iseditable       | Whether this message is editable.                   |
| ispinnable       | Whether this message is pinnable.                   |
| ispinned         | Whether this message is pinned.                     |
| isthread         | Whether this message is thread.                     |
| position         | Returns the position of this message.               |
| reactions        | Join all message reactions IDs.                     |
| reference        | Retrieves the message reference ID.                 |
| type             | Retrieves the message type.                         |
| url              | Retrieves the URL of this message.                  |


## Role
|     Property     |                       Description                       |
|------------------|---------------------------------------------------------|
| createdtimestamp | The time this role was created, in milliseconds.        |
| hexcolor         | Color this role has, as hexadecimal.                    |
| icon             | The icon of this role, if any.                          |
| id               | Role ID.                                                |
| iseditable       | Whether this role is editable.                          |
| iseveryonerole   | Whether this role is the @everyone role for this guild. |
| ishoisted        | Whether this role is hoisted.                           |
| ismanaged        | Whether this role is managed.                           |
| ismentionable    | Whether this role is mentionable.                       |
| name             | Name this role has.                                     |
| members          | Cached member IDs with this role.                       |
| mention          | Returns the role mention.                               |
| permissions      | Permission list this role has.                          |
| position         | This role position.                                     |
| rawposition      | This role raw position.                                 |


## Sticker
|     Property     |                     Description                     |
|------------------|-----------------------------------------------------|
| createdtimestamp | The time this sticker was created, in milliseconds. |
| description      | Retrieves this sticker description.                 |
| id               | Retrieves this sticker ID.                          |
| name             | Retrieves this sticker name.                        |
| tags             | Retrieves this sticker tags.                        |
| type             | Retrieves this sticker type.                        |
| url              | Retrieves this sticker URL.                         |


## Thread
|     Property      |                        Description                        |
|-------------------|-----------------------------------------------------------|
| archiveduration   | The for thread to be archived.                            |
| archivedtimestamp | The time this thread was archived, in milliseconds.       |
| createdtimestamp  | The time this thread was created, in milliseconds.        |
| id                | Retrieves the ID of this thread.                          |
| isarchived        | Whether this thread is archived.                          |
| iseditable        | Whether this thread is editable.                          |
| isinvitable       | Whether this thread is invitable.                         |
| isjoinable        | Whether this thread is joinable.                          |
| islocked          | Whether this thread is locked.                            |
| ismanageable      | Whether this thread is manageable.                        |
| isviewable        | Whether this thread is viewable.                          |
| lastmessageid     | Retrieves the ID of the last message sent in this thread. |
| ownerid           | Retrieves the ID of the user who created this thread.     |
| members           | Join all guild members IDs participating in this thread.  |
| membercount       | Retrieves the member count participating in this thread.  |
| messagecount      | Retrieves the message count in this thread.               |
| name              | Retrieves the name of this thread.                        |
| parentid          | Retrieves the parent ID of this thread.                   |
| slowmode          | Retrieves the slowmode of this thread.                    |
| type              | Retrieves the type of this thread.                        |
| url               | Retrieves the URL of this thread.                         |


## User
|     Property     |                       Description                        |
|------------------|----------------------------------------------------------|
| accentcolor      | The user's accent hexadecimal color.                     |
| avatar           | Retrieves the avatar of this user.                       |
| avatardecoration | Retrieves the avatar decoration of this user, if any.    |
| banner           | Retrieves the banner of this user.                       |
| createdtimestamp | The time this user created its account, in milliseconds. |
| displayname      | The displayed name of this user.                         |
| dmchannelid      | The channel ID of this user's DM.                        |
| id               | User ID.                                                 |
| isbot            | Whether user is bot.                                     |
| globalname       | The global name this user has.                           |
| username         | The username this user has.                              |

