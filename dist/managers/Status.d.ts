import { ActivityType } from 'discord.js';
import { Data } from '../structures/Data';
import { Bot } from '../structures/Bot';
interface StatusData {
    text: string;
    time?: string | number;
    type?: ActivityType;
    status?: 'online' | 'idle' | 'dnd' | 'invisible';
    url?: string;
}
export declare class StatusManager {
    #private;
    constructor(bot: Bot);
    /**
     * Add a status data to the manager.
     * @param status - Array of status objects.
     * @returns {StatusManager}
     */
    add(...status: StatusData[]): this;
    /**
     * Rotates all cached statuses.
     */
    rotate(d: Data): Promise<void>;
    /**
     * Returns the number of cached statuses.
     */
    get size(): number;
}
export {};
