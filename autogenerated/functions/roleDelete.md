# $roleDelete
Deletes a guild role.
## Usage
> `$roleDelete[roleId;guildId?;reason?]`
## Parameters
|   Name   |                     Description                      |  Type  |  Default value   |
|----------|------------------------------------------------------|--------|------------------|
| Role ID  | Guild role ID to be deleted.                         | String | none             |
| Guild ID | The ID of the guild where role will be deleted from. | String | d.ctx?.guild?.id |
| Reason   | Reason for role deletion.                            | String | none             |
