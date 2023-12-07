import { Client } from 'discord.js'
import { BotOptions } from './src'

export declare class Bot extends Client {
    public extraOptions: BotOptions
    
    constructor(options: BotOptions)

    override login(): Promise<string>
}