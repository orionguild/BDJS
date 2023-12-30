# BDJS
BDJS is a potent package for creating Discord bots. With a simple and intuitive API, BDJS makes it easy to build and deploy bots that can perform a wide range of tasks, from sending messages to managing roles and handling commands. Whether you're a seasoned developer or just starting out, BDJS is the perfect tool for creating bots.

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

## Resources
> Auto-generated documentation: [Click here](https://cyberghxst.github.io/bdjs)

> Guide: [Click here](https://bd.js.org)

## What inspired BDJS?
> HyteScript.js: [npm](https://npmjs.com/package/hytescript.js)

> ForgeScript: [npm](https://npmjs.com/package/forgescript)