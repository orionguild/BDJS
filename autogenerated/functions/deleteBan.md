# $deleteBan
Deletes a ban for the provided user ID in a guild.
## Usage
> `$deleteBan[userId;guildId?;reason?]`
## Parameters
|   Name   |                   Description                    |  Type  |  Default value   |
|----------|--------------------------------------------------|--------|------------------|
| User ID  | The user ID to be unbanned.                      | String | none             |
| Guild ID | The Guild ID where the user will be banned from. | String | d.ctx?.guild?.id |
| Reason   | The reason for deleting the ban.                 | String | none             |
