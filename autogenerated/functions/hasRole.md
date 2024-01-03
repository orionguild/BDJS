# $hasRole
Check if the provided member has a role.
## Usage
> `$hasRole[roleId;memberId?;guildId?]`
## Parameters
|   Name    |              Description               |  Type  |   Default value   |
|-----------|----------------------------------------|--------|-------------------|
| Role ID   | Guild role ID to be checked.           | String | none              |
| Member ID | The member to be checked.              | String | d.ctx?.author?.id |
| Guild ID  | The ID of the guild member belongs to. | String | d.ctx?.guild?.id  |
