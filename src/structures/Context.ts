import { BaseChannel, BaseInteraction, ChatInputCommandInteraction, CommandInteraction, InteractionEditReplyOptions, InteractionUpdateOptions, InteractionReplyOptions, Guild, GuildChannel, GuildMember, MessageComponentInteraction, MessageEditOptions, Message, MessagePayload, MessageCreateOptions, ModalSubmitInteraction, TextChannel, StageChannel, ThreadChannel, NewsChannel, User, InteractionResponse, Sticker } from 'discord.js'
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
 * Represents a context class.
 */
export class Context<T extends unknown = unknown> {
    public client: Bot
    public raw: T
    #hold: InteractionResponse | Message | null
    constructor(raw: T, client: Bot) {
        this.client = client
        this.raw = raw
        this.#hold = null
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
     * Points to the message author.
     */
    get author() {
        return this.raw instanceof Message
            ? this.raw.author : this.raw instanceof GuildMember
                ? this.raw.user : this.raw instanceof BaseInteraction
                    ? this.raw.user : this.raw instanceof User
                        ? this.raw : null
    }

    /**
     * Points to a channel.
     */
    get channel() {
        return this.raw instanceof BaseChannel
            ? this.raw : this.raw instanceof User
                ? this.raw.dmChannel : this.raw instanceof GuildMember
                    ? this.raw.user.dmChannel : this.raw instanceof Message
                        ? this.raw.channel : this.raw instanceof BaseInteraction
                            ? this.raw.channel : null
    }

    /**
     * Points to the current guild, if any.
     */
    get guild() {
        return this.raw instanceof Guild
            ? this.raw : this.raw instanceof GuildChannel
                ? this.raw.guild : this.raw instanceof GuildMember
                    ? this.raw.guild : this.raw instanceof Sticker
                        ? this.raw.guild : null
    }

    /**
     * Points to the current interaction, if any.
     */
    get interaction() {
        return this.raw instanceof BaseInteraction ? this.raw : null
    }

    /**
     * Points to the current guild member, if any.
     */
    get member() {
        return this.raw instanceof GuildMember ? this.raw : null
    }

    /**
     * Points to the current message, if any.
     */
    get message() {
        return this.#hold
    }

    /**
     * Set the message response to the context data.
     * @param msg - Message to be set.
     */
    #setMessage(msg: Message | InteractionResponse) {
        this.#hold = msg
    }
}