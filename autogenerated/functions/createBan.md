# $createBan
Creates a ban for the provided user ID in a guild.
## Usage
> `$createBan[userId;guildId?;options?]`
## Parameters
|   Name   |                   Description                    |  Type  |  Default value   |
|----------|--------------------------------------------------|--------|------------------|
| User ID  | The user ID to be banned.                        | String | none             |
| Guild ID | The Guild ID where the user will be banned from. | String | d.ctx?.guild?.id |
| Options  | Ban creation option builders.                    | String | none             |

## Extra Data
> Supports Builders