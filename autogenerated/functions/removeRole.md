# $removeRole
Removes a role from a guild member.
## Usage
> `$removeRole[role id;member id;guild id?]`
## Parameters
|   Name    |                  Description                  |  Type  |  Default value   |
|-----------|-----------------------------------------------|--------|------------------|
| Role ID   | The ID of the role to be removed.             | String | none             |
| Member ID | The ID of the member to remove the role from. | String | none             |
| Guild ID  | The ID of guild were the role belongs to.     | String | d.ctx?.guild?.id |
