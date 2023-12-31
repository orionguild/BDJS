# $roleFetch
Fetch a guild role property.
## Usage
> `$roleFetch[property;role id;guild id?]`
## Parameters
|   Name   |                    Description                    |  Type  |  Default value   |
|----------|---------------------------------------------------|--------|------------------|
| Property | Role property name.                               | String | none             |
| Role ID  | Guild role ID to fetch the property from.         | String | none             |
| Guild ID | The ID of the guild where role should be fetched. | String | d.ctx?.guild?.id |
