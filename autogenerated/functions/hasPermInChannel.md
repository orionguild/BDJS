# $hasPermInChannel
Check if the member has the provided permission in channel.
## Usage
> `$hasPermInChannel[permissionName;memberId?;channelId?;guildId?]`
## Parameters
|      Name       |                Description                |  Type  |   Default value    |
|-----------------|-------------------------------------------|--------|--------------------|
| Permission Name | The name of the permission to be checked. | String | none               |
| Member ID       | The member to be checked.                 | String | d.ctx?.author?.id  |
| Channel ID      | The channel to be checked.                | String | d.ctx?.channel?.id |
| Guild ID        | The ID of the guild member belongs to.    | String | d.ctx?.guild?.id   |
