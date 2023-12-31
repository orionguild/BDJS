# $editMessage
Retrieves data from an embed message.
## Usage
> `$editMessage[message;guild id?;channel id?;message id?]`
## Parameters
|    Name    |           Description            |  Type  |   Default value    |
|------------|----------------------------------|--------|--------------------|
| Message    | The message payload.             | String | none               |
| Guild ID   | Guild ID where message is in.    | String | d.ctx?.guild?.id   |
| Channel ID | Channel ID where message is in.  | String | d.ctx?.channel?.id |
| Message ID | Message ID to get the data from. | String | d.ctx?.message?.id |
