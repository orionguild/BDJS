import { Bot } from '../structures/Bot';
import { BaseEvent } from '../structures/Event';
export declare class EventManager extends Map<string, BaseEvent<any>> {
    /**
     * Load events from a directory.
     * @param bot - BDJS client.
     */
    loadNatives(bot: Bot): Promise<void>;
    /**
     * Return all RAW string event names.
     */
    get names(): string[];
    /**
     * Return BDJS event names as string.
     */
    get reformulatedNames(): string[];
}
