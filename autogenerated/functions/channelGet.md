# $channelGet
Get a channel property.
## Usage
> `$channelGet[property;channelId?;guildId?]`
## Parameters
|    Name    |             Description              |  Type  |   Default value    |
|------------|--------------------------------------|--------|--------------------|
| Property   | Channel property name.               | String | none               |
| Channel ID | Channel ID to get the property from. | String | d.ctx?.channel?.id |
| Guild ID   | Guild ID to get the property from.   | String | d.ctx?.guild?.id   |
