# $try
Allows you to handle and manage errors and exceptions in a code.
## Usage
> `$try[code;catchCode;finallyCode?;separator?]`
## Parameters
|     Name     |                  Description                   |  Type  | Default value |
|--------------|------------------------------------------------|--------|---------------|
| Code         | The code to try first.                         | String | none          |
| Catch code   | The code to execute something goes wrong.      | String | none          |
| Finally code | The code to execute if the condition is false. | String | none          |
| Separator    | Code result separator.                         | String | ,             |
