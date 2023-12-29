import { BaseChannel, BaseInteraction, ChatInputCommandInteraction, InteractionEditReplyOptions, InteractionUpdateOptions, InteractionReplyOptions, Guild, GuildMember, MessageComponentInteraction, MessageEditOptions, Message, MessagePayload, MessageCreateOptions, User, InteractionResponse } from 'discord.js';
import { Bot } from './Bot';
/**
 * Get the correct message payload for the given context.
 */
type GetPayload<T> = T extends Message ? MessageCreateOptions : T extends ChatInputCommandInteraction ? InteractionReplyOptions & {
    fetchReply?: boolean;
} : T extends MessageComponentInteraction ? InteractionReplyOptions : MessagePayload;
type GetEditPayload<T> = T extends Message ? MessageEditOptions : T extends ChatInputCommandInteraction ? InteractionEditReplyOptions : T extends MessageComponentInteraction ? InteractionUpdateOptions : MessagePayload;
/**
 * Represents a context class.
 */
export declare class Context<T extends unknown = unknown> {
    #private;
    client: Bot;
    raw: T;
    constructor(raw: T, client: Bot);
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
    followUp(options: GetPayload<T> | string): Promise<Message<boolean> | InteractionResponse<boolean> | null>;
    /**
     * Sends a message using the possible channel.
     * @param payload - Message payload to be sent.
     */
    send(payload: GetPayload<T> | string): Promise<Message<boolean> | InteractionResponse<boolean> | null>;
    /**
     * Points to the message author.
     */
    get author(): User | null;
    /**
     * Points to a channel.
     */
    get channel(): import("discord.js").DMChannel | import("discord.js").PartialDMChannel | import("discord.js").GuildTextBasedChannel | (T & BaseChannel) | null;
    /**
     * Points to the current guild, if any.
     */
    get guild(): Guild | null;
    /**
     * Points to the current interaction, if any.
     */
    get interaction(): (T & BaseInteraction<any>) | null;
    /**
     * Points to the current guild member, if any.
     */
    get member(): (T & GuildMember) | null;
    /**
     * Points to the current message, if any.
     */
    get message(): Message<boolean> | InteractionResponse<boolean> | null;
}
export {};
