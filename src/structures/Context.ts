import { BaseChannel, BaseInteraction, ChatInputCommandInteraction, CommandInteraction, InteractionEditReplyOptions, InteractionUpdateOptions, InteractionReplyOptions, Guild, GuildChannel, GuildMember, MessageComponentInteraction, MessageEditOptions, Message, MessagePayload, MessageCreateOptions, ModalSubmitInteraction, TextChannel, StageChannel, ThreadChannel, NewsChannel, User, InteractionResponse, Sticker, GuildTextBasedChannel, Interaction, PartialGuildMember, TextBasedChannel, APIInteractionGuildMember, PartialUser, NonThreadGuildBasedChannel } from 'discord.js'
import { Bot } from './Bot'

/**
 * Get the correct message payload for the given context.
 */
type GetPayload<T> = T extends Message ? MessageCreateOptions
    : T extends ChatInputCommandInteraction ? InteractionReplyOptions & { fetchReply?: boolean }
    : T extends MessageComponentInteraction ? InteractionReplyOptions : MessagePayload

type GetEditPayload<T> = T extends Message ? MessageEditOptions
    : T extends ChatInputCommandInteraction ? InteractionEditReplyOptions
    : T extends MessageComponentInteraction ? InteractionUpdateOptions : MessagePayload

/**
 * Look-up for a valid context instance.
 * @param data - Context to be checked.
 * @returns {boolean}
 */
function isValidInstance(data: TextChannel | ThreadChannel | StageChannel | NewsChannel | User) {
    const classes = [TextChannel, ThreadChannel, StageChannel, NewsChannel, User]
    return classes.some(cl => data instanceof cl)
}

/**
 * Context setters.
 */
interface ContextData<T extends unknown = unknown> {
    guild?: Guild | null
    message?: Message | null
    channel?: TextBasedChannel | GuildTextBasedChannel | NonThreadGuildBasedChannel | null
    author?: PartialUser | User | null
    member?: APIInteractionGuildMember | GuildMember | PartialGuildMember | null | undefined,
    interaction?: Interaction,
    raw: T
}

/**
 * Represents a context class.
 */
export class Context<T extends unknown = unknown> {
    public client: Bot
    public raw: T
    public guild: Guild | null
    public message: Message | null
    public channel: TextBasedChannel | GuildTextBasedChannel | NonThreadGuildBasedChannel | null
    public author: PartialUser | User | null
    public member: APIInteractionGuildMember | GuildMember | PartialGuildMember | null | undefined
    public interaction: Interaction | null
    #hold: InteractionResponse | Message | null
    constructor(data: ContextData<T>, client: Bot) {
        this.client = client
        this.raw = data.raw

        this.#hold = null

        this.author = data.author ?? null
        this.channel = data.channel ?? null
        this.interaction = data.interaction ?? null
        this.guild = data.guild ?? null
        this.member = data.member ?? null
        this.message = data.message ?? this.#hold
    }

    /**
     * Defers the message response.
     * @param ephemeral - Whether message should be sent as ephemeral. (INTERACTION-ONLY)
     * @param [fetchReply=false] - Whether fetch original response.
     */
    async defer(ephemeral = false, fetchReply = false) {
        if (this.raw instanceof CommandInteraction) {
            return await this.raw.deferReply({ ephemeral, fetchReply })
        } else if (this.raw instanceof MessageComponentInteraction) {
            return await this.raw.deferUpdate({ fetchReply })
        } else if (this.channel && 'sendTyping' in this.channel) {
            return await this.channel.sendTyping().catch((e: Error) => null)
        }
    }

    /**
     * Edit the response was sent.
     * @param options - Message edit options.
     */
    async edit(options: GetEditPayload<T> | string) {
        if (this.interaction instanceof CommandInteraction) {
            return await this.interaction.editReply(options)
        } else if (this.interaction instanceof MessageComponentInteraction) {
            return await this.interaction.update(options)
        } else if (this.#hold instanceof Message) {
            return await this.#hold.edit(options)
        } else return null
    }

    /**
     * Follow up a message response.
     * @param options - Message payload to be sent.
     */
    async followUp(options: GetPayload<T> | string) {
        if (this.interaction instanceof CommandInteraction) {
            return await this.interaction.followUp(options)
        } else if (this.interaction instanceof MessageComponentInteraction) {
            return await this.interaction.reply(options)
        } else if (this.#hold instanceof Message) {
            return await this.#hold.reply(options)
        } else return null
    }

    /**
     * Sends a message using the possible channel.
     * @param payload - Message payload to be sent.
     */
    async send(payload: GetPayload<T> | string) {
        if (this.raw instanceof ChatInputCommandInteraction) {
            const reply = await this.raw.reply(
                payload as InteractionReplyOptions
                    &
                { fetchReply?: boolean }
            )
            if (
                typeof payload !== 'string'
                    &&
                (payload as InteractionReplyOptions & { fetchReply?: boolean }).fetchReply
            ) this.#setMessage(reply as unknown as Message)
            return reply
        } else if (this.raw instanceof MessageComponentInteraction) {
            const reply = await this.raw.reply(payload)
            this.#setMessage(reply)
            return reply
        } else if (this.raw instanceof ModalSubmitInteraction) {
            const reply = await this.raw.reply(payload)
            this.#setMessage(reply)
            return reply
        } else if (this.raw instanceof Message) {
            const reply = await this.raw.channel.send(payload)
            this.#setMessage(reply)
            return reply
        } else if (isValidInstance(this.raw as any)) {
            const reply = await (this.raw as any).send(payload) as Message
            this.#setMessage(reply)
            return reply
        } else if (this.raw instanceof GuildMember) {
            const reply = await this.raw.user.send(payload)
            this.#setMessage(reply)
            return reply
        } else return null
    }

    /**
     * Set the message response to the context data.
     * @param msg - Message to be set.
     */
    #setMessage(msg: Message | InteractionResponse) {
        this.#hold = msg
    }
}