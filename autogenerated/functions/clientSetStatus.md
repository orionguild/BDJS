# $clientSetStatus
Set the presence for the client.
## Usage
> `$clientSetStatus[text;type?;status?;url?;afk?]`
## Parameters
|  Name  |          Description          |  Type   | Default value |
|--------|-------------------------------|---------|---------------|
| Text   | The text for the presence.    | String  | none          |
| Type   | The type for the presence.    | String  | playing       |
| Status | Status type for the presence. | String  | online        |
| URL    | Streaming URL, if set.        | String  | none          |
| AFK    | Whether client is AFK.        | Boolean | false         |
