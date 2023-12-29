import { StringEventNames } from '../index';
import { Bot } from './Bot';
export interface BaseEvent<T extends any[]> {
    name: StringEventNames;
    description?: string;
    once?: boolean;
    listener: (bot: Bot, ...args: T) => Promise<any>;
}
export declare class BaseEvent<T extends any[]> implements BaseEvent<T> {
    constructor(data: BaseEvent<T>);
}
