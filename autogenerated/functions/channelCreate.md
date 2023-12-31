# $channelCreate
Creates a channel in a guild.
## Usage
> `$channelCreate[name;type?;guild id?;options?;return id?]`
## Parameters
|   Name    |                     Description                      |  Type   |  Default value   |
|-----------|------------------------------------------------------|---------|------------------|
| Name      | The name for this channel.                           | String  | none             |
| Type      | The channel type.                                    | String  | text             |
| Guild ID  | The ID of the guild where channel should be created. | String  | d.ctx?.guild?.id |
| Options   | Builder functions to set channel properties.         | String  | none             |
| Return ID | Whether return channel ID.                           | Boolean | false            |

## Extra Data
> Supports Builders