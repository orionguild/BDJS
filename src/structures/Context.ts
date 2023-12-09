import {
    MessageReaction,
    BaseInteraction,
    BaseChannel,
    GuildMember,
    Message,
    Channel,
    Guild,
    User
} from 'discord.js';

type ContextIs = 'Channel' | 'Guild' | 'Interaction' | 'Message' | 'Reaction' | 'User' | 'Unknown'

export class Context<T extends Record<string, any>> {
    public data: T
    constructor(data: T) {
        this.data = data
    }

    /**
     * Get the current channel.
     */
    get channel(): BaseChannel | null {
        return this.data instanceof BaseChannel
            ? this.data : this.data instanceof Message
                ? this.data.channel : this.data instanceof User
                    ? this.data.dmChannel : this.data.channel
                        ? this.data.channel : null
    }

    /**
     * Get the current guild.
     */
    get guild(): Guild | null {
        return this.data instanceof Guild
            ? this.data : this.data.guild
                ? this.data.guild : null
    }

    /**
     * Get the current message.
     */
    get message(): Message | null {
        return this.data instanceof Message
            ? this.data : this.data.message
                ? this.data.message : null
    }

    /**
     * Get the current message author.
     */
    get user(): User | null {
        return this.data instanceof Message
            ? this.data.author : this.data.user
                ? this.data.user : null
    }

    /**
     * Returns the context data type.
     */
    get is(): ContextIs {
        return this.data instanceof BaseChannel
            ? 'Channel' : this.data instanceof Guild
                ? 'Guild' : this.data instanceof BaseInteraction
                    ? 'Interaction' : this.data instanceof Message
                        ? 'Message' : this.data instanceof MessageReaction
                            ? 'Reaction' : this.data instanceof User
                                ? 'User' : 'Unknown'
    }
}
