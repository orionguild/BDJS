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

## Resources
> Auto-generated documentation: [Click here](https://cyberghxst.github.io/bdjs)