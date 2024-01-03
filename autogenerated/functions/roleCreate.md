# $roleCreate
Creates a role in a guild.
## Usage
> `$roleCreate[name;options?;guildId?;returnId?]`
## Parameters
|   Name    |                    Description                    |  Type   |  Default value   |
|-----------|---------------------------------------------------|---------|------------------|
| Name      | The name for the role.                            | String  | none             |
| Options   | Builder functions to set role properties.         | String  | none             |
| Guild ID  | The ID of the guild where role should be created. | String  | d.ctx?.guild?.id |
| Return ID | Whether return role ID.                           | Boolean | false            |

## Extra Data
> Supports Builders