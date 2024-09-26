import { ChatInputCommandInteraction, InteractionEditReplyOptions, InteractionUpdateOptions, InteractionReplyOptions, Guild, GuildMember, MessageComponentInteraction, MessageEditOptions, Message, MessagePayload, MessageCreateOptions, User, InteractionResponse, GuildTextBasedChannel, Interaction, PartialGuildMember, TextBasedChannel, APIInteractionGuildMember, PartialUser, NonThreadGuildBasedChannel } from 'discord.js';
import { Bot } from './Bot';
/**
 * Get the correct message payload for the given context.
 */
type GetPayload<T> = T extends Message ? MessageCreateOptions : T extends ChatInputCommandInteraction ? InteractionReplyOptions & {
    fetchReply?: boolean;
} : T extends MessageComponentInteraction ? InteractionReplyOptions : MessagePayload;
type GetEditPayload<T> = T extends Message ? MessageEditOptions : T extends ChatInputCommandInteraction ? InteractionEditReplyOptions : T extends MessageComponentInteraction ? InteractionUpdateOptions : MessagePayload;
/**
 * Context setters.
 */
interface ContextData<T extends unknown = unknown> {
    guild?: Guild | null;
    message?: Message | null;
    channel?: TextBasedChannel | GuildTextBasedChannel | NonThreadGuildBasedChannel | null;
    author?: PartialUser | User | null;
    member?: APIInteractionGuildMember | GuildMember | PartialGuildMember | null | undefined;
    interaction?: Interaction;
    raw: T;
}
/**
 * Represents a context class.
 */
export declare class Context<T extends unknown = unknown> {
    #private;
    client: Bot;
    raw: T;
    guild: Guild | null;
    message: Message | null;
    channel: TextBasedChannel | GuildTextBasedChannel | NonThreadGuildBasedChannel | null;
    author: PartialUser | User | null;
    member: APIInteractionGuildMember | GuildMember | PartialGuildMember | null | undefined;
    interaction: Interaction | null;
    constructor(data: ContextData<T>, client: Bot);
    /**
     * Defers the message response.
     * @param ephemeral - Whether message should be sent as ephemeral. (INTERACTION-ONLY)
     * @param [fetchReply=false] - Whether fetch original response.
     */
    defer(ephemeral?: boolean, fetchReply?: boolean): Promise<void | InteractionResponse<boolean> | null>;
    /**
     * Edit the response was sent.
     * @param options - Message edit options.
     */
    edit(options: GetEditPayload<T> | string): Promise<Message<boolean> | InteractionResponse<boolean> | null>;
    /**
     * Follow up a message response.
     * @param options - Message payload to be sent.
     */
    followUp(options: GetPayload<T> | string): Promise<Message<boolean> | null>;
    /**
     * Sends a message using the possible channel.
     * @param payload - Message payload to be sent.
     */
    send(payload: GetPayload<T> | string): Promise<any>;
}
export {};
