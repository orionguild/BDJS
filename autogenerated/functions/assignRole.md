# $assignRole
Assigns a role to a guild member.
## Usage
> `$assignRole[roleId;memberId;guildId?]`
## Parameters
|   Name    |                 Description                 |  Type  |  Default value   |
|-----------|---------------------------------------------|--------|------------------|
| Role ID   | The ID of the role to be assigned.          | String | none             |
| Member ID | The ID of the member to assign the role to. | String | none             |
| Guild ID  | The ID of guild were the role belongs to.   | String | d.ctx?.guild?.id |
