# $roleGet
Get a guild role property.
## Usage
> `$roleGet[property;roleId;guildId?]`
## Parameters
|   Name   |                     Description                     |  Type  |  Default value   |
|----------|-----------------------------------------------------|--------|------------------|
| Property | Role property name.                                 | String | none             |
| Role ID  | Guild role ID to get the property from.             | String | none             |
| Guild ID | The ID of the guild where role should be retrieved. | String | d.ctx?.guild?.id |
