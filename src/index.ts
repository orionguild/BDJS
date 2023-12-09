import { Bot } from './structures/Bot'

export type StringCommandTypes = 'ready' | 'prefixed' | 'unprefixed' | 'unknown'

export type BDJSEventNames = 'onMessageCreate' 
    | 'onInteractionCreate'
    | 'onReady|'

export { Bot }