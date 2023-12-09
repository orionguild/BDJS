import { StringEventNames } from '../index'
import { ClientEvents } from 'discord.js'
import { Bot } from './Bot'

export interface BaseEvent<T extends any[]> {
    name: StringEventNames
    description?: string
    once?: boolean
    listener: (bot: Bot, ...args: T) => Promise<any>
}
 
export class BaseEvent<T extends any[]> implements BaseEvent<T> {
    constructor(data: BaseEvent<T>) {
        this.name = data.name
        this.description = data.description
        this.once = data.once ?? false
        this.listener = data.listener
    }
}