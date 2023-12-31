# $memberGet
Get a guild member property.
## Usage
> `$memberGet[property;member id;guild id?]`
## Parameters
|   Name    |                      Description                      |  Type  |   Default value   |
|-----------|-------------------------------------------------------|--------|-------------------|
| Property  | Member property name.                                 | String | none              |
| Member ID | Guild member ID to get the property from.             | String | d.ctx?.author?.id |
| Guild ID  | The ID of the guild where member should be retrieved. | String | d.ctx?.guild?.id  |
