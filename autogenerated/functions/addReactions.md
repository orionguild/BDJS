# $addReactions
Adds reactions to a message.
## Usage
> `$addReactions[reactions;message id?;channel id?;guild id?]`
## Parameters
|    Name    |                    Description                     |  Type  |   Default value    |
|------------|----------------------------------------------------|--------|--------------------|
| Reactions  | All message reactions, separated by commas.        | String | none               |
| Message ID | The message ID to add reactions to.                | String | d.ctx?.message?.id |
| Channel ID | The ID of the channel that the message belongs to. | String | d.ctx?.channel?.id |
| Guild ID   | The guild ID of the message.                       | String | d.ctx?.guild?.id   |
