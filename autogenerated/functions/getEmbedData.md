# $getEmbedData
Retrieves data from an embed message.
## Usage
> `$getEmbedData[property;index?;messageId?]`
## Parameters
|    Name    |           Description            |  Type  |   Default value    |
|------------|----------------------------------|--------|--------------------|
| Property   | Embed property to be retrieved.  | String | none               |
| Index      | Embed index.                     | Number |                  1 |
| Message ID | Message ID to get the data from. | String | d.ctx?.message?.id |
