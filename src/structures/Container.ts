import {
    Attachment,
    AttachmentBuilder,
    AttachmentPayload,
    APIAttachment,
    APIEmbed,
    APIActionRowComponent,
    APIMessageActionRowComponent,
    ActionRowData,
    BufferResolvable,
    JSONEncodable,
    MessageMentionOptions,
    MessageActionRowComponentData,
    MessageActionRowComponentBuilder,
    Snowflake,
    MessageMentionTypes
} from 'discord.js'
import { Stream } from 'stream'

/**
 * Represents a message container.
 */
export class Container {
    public content?: string
    public embeds?: (JSONEncodable<APIEmbed> | APIEmbed)[]
    public allowedMentions?: MessageMentionOptions
    public files?: (
        | BufferResolvable
        | Stream
        | JSONEncodable<APIAttachment>
        | Attachment
        | AttachmentBuilder
        | AttachmentPayload
    )[] = []
    public components?: (
        | JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>>
        | ActionRowData<MessageActionRowComponentData | MessageActionRowComponentBuilder>
        | APIActionRowComponent<APIMessageActionRowComponent>
    )[] = []
    public fetchReply?: boolean = true
    public ephemeral?: boolean = true

    /**
     * Set the allowed mentions for this payload.
     * @param parse - Allow parse 'roles', 'users' and 'everyone'.
     * @param roles - Role snowflakes to be mentioned.
     * @param users - User snowflakes to be mentioned.
     * @param repliedUser - Mention the replied user?
     */
    setAllowedMentions(
        parse: MessageMentionTypes[] = [],
        roles: Snowflake[] = [],
        users: Snowflake[] = [],
        repliedUser = false
    ) {
        this.allowedMentions = {
            parse,
            roles,
            users,
            repliedUser
        }
        return this
    }

    /**
     * Set the payload content.
     * @param content - Payload content.
     */
    pushContent(content: string) {
        if (!this.content) this.content = ''
        this.content += content
        return this
    }

    /**
     * Adds a component data to this payload.
     * @param data - Component data.
     */
    addComponent(data: JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>> | ActionRowData<MessageActionRowComponentData | MessageActionRowComponentBuilder> | APIActionRowComponent<APIMessageActionRowComponent>) {
        if (!this.components) this.components = []
        this.components.push(data)
        return this
    }

    /**
     * Adds an embed to this payload.
     * @param data - Embed payload.
     */
    addEmbed(data: JSONEncodable<APIEmbed> | APIEmbed) {
        if (!this.embeds) this.embeds = []
        this.embeds?.push(data)
        return this
    }

    /**
     * Adds a file data to this payload.
     * @param data - File payload.
     */
    addFile(data: BufferResolvable | Stream | JSONEncodable<APIAttachment> | Attachment | AttachmentBuilder | AttachmentPayload) {
        if (!this.files) this.files = []
        this.files.push(data)
        return this
    }

    /**
     * Whether fetch message reply.
     * @param state - Boolean state.
     */
    setFetchReply(state: boolean) {
        this.fetchReply = state
        return this
    }

    /**
     * Whether set ephemeral responses.
     * @param state - Boolean state.
     */
    setEphemeral(state: boolean) {
        this.ephemeral = state
        return this
    }

    /**
     * Clear the container.
     */
    clear() {
        this.allowedMentions = undefined
        this.content = undefined
        this.components = undefined
        this.embeds = undefined
        this.files = undefined
        this.fetchReply = false
        this.ephemeral = false
    }
}