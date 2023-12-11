# BDJS
BDJS is a lightweight, yet potent package for creating Discord bots.
With a simple and intuitive API, BDJS makes it easy to build and deploy 
bots that can perform a wide range of tasks, from sending 
messages to managing roles and handling commands. Whether you're a 
seasoned developer or just starting out, 
BDJS is the perfect tool for creating bots that will enhance your Discord experience.

## Install
### npm
> `npm install bdjs`
### pnpm
> `pnpm add bdjs`
### yarn
> `yarn add bdjs`

## Basic Setup
```js
const { Bot } = require('bdjs')

const bot = new Bot({
    auth: 'BOT TOKEN',
    events: [
        'onMessageCreate',
        'onReady'
    ],
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ],
    prefixes: [
        'PREFIX_1',
        'PREFIX_2'
    ]
})

bot.login()
```

## Commands
With BDJS, you can define custom commands that can be used to perform complex data manipulation tasks with just a few lines of code. This makes it easy to create powerful and flexible data manipulation workflows without any hassle.
### Basic command setup
To define a command, you must use CommandManager#add like the following example.
```js
const { Bot } = require('bdjs')

const bot = new Bot({
    auth: 'BOT TOKEN',
    events: [
        'onMessageCreate',
        'onReady'
    ],
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ],
    prefixes: [
        'PREFIX_1',
        'PREFIX_2'
    ]
})

bot.commands.add({
    name: 'ping',
    aliases: ['latency'],
    type: 'prefixed',
    code: `
        Pong!
    `
})

bot.login()
```

### Command Loader
CommandManager lets you load commands from a directory with ease.
```js
const { Bot } = require('bdjs')

const bot = new Bot({
    auth: 'BOT TOKEN',
    events: [
        'onMessageCreate',
        'onReady'
    ],
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ],
    prefixes: [
        'PREFIX_1',
        'PREFIX_2'
    ]
})

bot.commands.load('commands').then(async () => {
    await bot.login() // Connecting the bot when commands are loaded.
})
```

### Allowed command types
|         Name          |                                  Description                                  |
|-----------------------|-------------------------------------------------------------------------------|
| ready                 | Executed when client user is ready.                                           |
| prefixed              | Executed when a prefixed message is created.                                  |
| unprefixed            | Executed when an unprefixed (command name without prefix) message is created. |
| always                | Executed when a message is created.                                           |
| anyInteraction        | Executed when an interaction is created.                                      |
| buttonInteraction     | Executed when a button interaction is created.                                |
| selectMenuInteraction | Executed when a select menu interaction is created.                           |
| commandInteraction    | Executed when a command interaction is created.                               |
| modalInteraction      | Executed when a modal interaction is created.                                 |

## Events
Events must be declared inside client constructor to be listened, else the event won't be executed.
Events are case-sensitive, so take a look on how you define them.
```js
const { Bot } = require('bdjs')

const bot = new Bot({
    ...
    events: [
        'onMessageCreate',
        'onInteractionCreate',
        'onReady'
    ],
    ...
})
```

## Supported events
As of now, these events are supported.
|        Name         |               Description                |
|---------------------|------------------------------------------|
| onError             | Executed when an error is emitted.       |
| onInteractionCreate | Executed when an interaction is created. |
| onMessageCreate     | Executed when a message is created.      |
| onReady             | Executed when client user is ready.      |

## Function
Functions are the compact way to interact with the Discord API.
### Creating a custom function
You can add your own function by following the next example.
```js
const { Bot } = require('bdjs')

const bot = new Bot({
    ...
    events: [
        'onMessageCreate',
        'onInteractionCreate',
        'onReady'
    ],
    ...
})

bot.functions.add({
    name: '$helloWorld',
    description: 'Prints a message using $helloWorld keyword, that is fun.',
    builders: false, // Optional property. If this function support builder functions.
    injectable: false, // Optional property. If this function support subfunction injection.
    parameters: [
        {
            name: 'Parameter',
            description: 'Parameter to be printed.',
            required: true,
            resolver: 'String',
            compile: true, // Optional property. Tell the compiler to compile this field or not.
            unescape: true, // Optional property. Tell the compiler to unescape this field or not.
            value: 'none' // Default field value, if any. Set to "none" if don't have default value.
        }
    ],
    code: async (d, [param]) => {
        if (param === undefined)
            throw new d.error(d, 'required', 'parameter', d.function.name)
        console.log(param)
    }
})

bot.login()
```
### Builder functions
Builder functions are functions that are **function-scope** executable, this means
that these functions just will work inside its parent function.
```
# Works!
$roleCreate[xd;
    $setColor[FFEDF4]
    $setHoist[true]
    $setMentionable[false]
    $setReason[Nomás porque si.]
    $setPermissions[SendMessages]
]

# Will throw an error.
$roleCreate[xd;
    $setColor[FFEDF4]
    $setHoist[true]
    $setMentionable[false]
    $setReason[Nomás porque si.]
]
$setPermissions[SendMessages]
```
### Builder-compatible functions
| Function name |        Description         |
|---------------|----------------------------|
| $createEmbed  | Creates an embed.          |
| $roleCreate   | Creates a role in a guild. |
### Function injections
Injections allows to inject subfunctions to any function that supports it.
```js
const { Bot } = require('bdjs')

const bot = new Bot({
    ...
    events: [
        'onMessageCreate',
        'onInteractionCreate',
        'onReady'
    ],
    ...
})

bot.functions.inject('createEmbed', 'myFunction', {
    async code(d) {
        return 'success'
    }
})

bot.commands.add({
    name: 'run',
    type: 'prefixed',
    code: `
        $createEmbed[
            ...
            $myFunction # Will work
        ]

        $myFunction # Will not work
    `
})
```
### Injectable functions
| Function name |    Description    |
|---------------|-------------------|
| $createEmbed  | Creates an embed. |

## Resources
> Auto-generated documentation: [Click here](https://cyberghxst.github.io/bdjs)

## What inspired BDJS?
> HyteScript.js: [npm](https://npmjs.com/package/hytescript.js)