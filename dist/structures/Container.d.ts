/// <reference types="node" />
import { Attachment, AttachmentBuilder, AttachmentPayload, APIAttachment, APIEmbed, APIActionRowComponent, APIMessageActionRowComponent, ActionRowData, BufferResolvable, JSONEncodable, MessageMentionOptions, MessageActionRowComponentData, MessageActionRowComponentBuilder, Snowflake, MessageMentionTypes } from 'discord.js';
import { Stream } from 'stream';
/**
 * Represents a message container.
 */
export declare class Container {
    content?: string;
    embeds?: (JSONEncodable<APIEmbed> | APIEmbed)[];
    allowedMentions?: MessageMentionOptions;
    files?: (BufferResolvable | Stream | JSONEncodable<APIAttachment> | Attachment | AttachmentBuilder | AttachmentPayload)[];
    components?: (JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>> | ActionRowData<MessageActionRowComponentData | MessageActionRowComponentBuilder> | APIActionRowComponent<APIMessageActionRowComponent>)[];
    fetchReply?: boolean;
    ephemeral?: boolean;
    /**
     * Set the allowed mentions for this payload.
     * @param parse - Allow parse 'roles', 'users' and 'everyone'.
     * @param roles - Role snowflakes to be mentioned.
     * @param users - User snowflakes to be mentioned.
     * @param repliedUser - Mention the replied user?
     */
    setAllowedMentions(parse?: MessageMentionTypes[], roles?: Snowflake[], users?: Snowflake[], repliedUser?: boolean): this;
    /**
     * Set the payload content.
     * @param content - Payload content.
     */
    pushContent(content: string): this;
    /**
     * Adds a component data to this payload.
     * @param data - Component data.
     */
    addComponent(data: JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>> | ActionRowData<MessageActionRowComponentData | MessageActionRowComponentBuilder> | APIActionRowComponent<APIMessageActionRowComponent>): this;
    /**
     * Adds an embed to this payload.
     * @param data - Embed payload.
     */
    addEmbed(data: JSONEncodable<APIEmbed> | APIEmbed): this;
    /**
     * Adds a file data to this payload.
     * @param data - File payload.
     */
    addFile(data: BufferResolvable | Stream | JSONEncodable<APIAttachment> | Attachment | AttachmentBuilder | AttachmentPayload): this;
    /**
     * Whether fetch message reply.
     * @param state - Boolean state.
     */
    setFetchReply(state: boolean): this;
    /**
     * Whether set ephemeral responses.
     * @param state - Boolean state.
     */
    setEphemeral(state: boolean): this;
    /**
     * Clear the container.
     */
    clear(): void;
}
