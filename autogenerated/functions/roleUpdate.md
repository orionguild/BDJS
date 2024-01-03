# $roleUpdate
Updates a role in a guild.
## Usage
> `$roleUpdate[roleId;options?;guildId?]`
## Parameters
|   Name   |                   Description                   |  Type  |  Default value   |
|----------|-------------------------------------------------|--------|------------------|
| Role ID  | Guild role ID to be updated.                    | String | none             |
| Options  | Builder functions to set role properties.       | String | none             |
| Guild ID | The ID of the guild where role will be updated. | String | d.ctx?.guild?.id |

## Extra Data
> Supports Builders