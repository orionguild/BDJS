import { FunctionManager } from '../managers/Function';
import { EventManager } from '../managers/Event';
import { Bot } from './Bot';
/**
 * Represents a BDJS plugin.
 */
export declare class Plugin {
    name: string;
    description: string;
    version: string;
    functionManager: FunctionManager;
    eventManager: EventManager;
    constructor(data: {
        name: string;
        description: string;
        version: string;
    });
    load(dir: string, providing_cwd?: boolean): Promise<void>;
    /**
     * Custom setup to let developers extend its plugin.
     * @param bot - BDJS client instance.
     */
    customSetup(bot: Bot): Promise<void>;
    /**
     * Attach this plugin into the BDJS client.
     * @param bot - BDJS client.
     */
    __attach__(bot: Bot): void;
}
