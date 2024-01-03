# $automodRuleGet
Get an automoderation rule property.
## Usage
> `$automodRuleGet[property;ruleId?;guildId?]`
## Parameters
|   Name   |            Description             |  Type  |  Default value   |
|----------|------------------------------------|--------|------------------|
| Property | Guild property name.               | String | none             |
| Rule ID  | Rule ID to get the property from.  | String | none             |
| Guild ID | Guild ID to get the property from. | String | d.ctx?.guild?.id |
