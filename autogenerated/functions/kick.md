# $kick
Kicks an user from the provided guild.
## Usage
> `$kick[userId;guildId?;reason?]`
## Parameters
|   Name   |                   Description                    |  Type  |  Default value   |
|----------|--------------------------------------------------|--------|------------------|
| User ID  | The user ID to be kicked.                        | String | none             |
| Guild ID | The Guild ID where the user will be kicked from. | String | d.ctx?.guild?.id |
| Reason   | Kick reason.                                     | String | none             |

## Extra Data
> Supports Builders