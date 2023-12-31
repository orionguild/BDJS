# $hasPerm
Check if the member has the provided permission.
## Usage
> `$hasPerm[permission name;member id?;guild id?]`
## Parameters
|      Name       |                Description                |  Type  |   Default value   |
|-----------------|-------------------------------------------|--------|-------------------|
| Permission Name | The name of the permission to be checked. | String | none              |
| Member ID       | The member to be checked.                 | String | d.ctx?.author?.id |
| Guild ID        | The ID of the guild member belongs to.    | String | d.ctx?.guild?.id  |
