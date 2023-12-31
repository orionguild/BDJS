# $httpPatch
Performs an http PATCH request to given url.
## Usage
> `$httpPatch[url;data;variable;response type?;headers?]`
## Parameters
|     Name      |                            Description                            |  Type  | Default value |
|---------------|-------------------------------------------------------------------|--------|---------------|
| URL           | URL to request to.                                                | String | none          |
| Data          | Data to send as body.                                             | Object | none          |
| Variable      | Variable name to load the results to.                             | String | none          |
| Response Type | The type of response API can return. (json|text|blob|arrayBuffer) | String | json          |
| Headers       | Headers to include to the request data.                           | String | none          |
