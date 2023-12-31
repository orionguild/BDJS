import { AnyThreadChannel, Guild, GuildMember, Message, PartialGuildMember, PartialMessage, Role, Sticker, TextChannel, User, VoiceChannel } from 'discord.js';
import { Bot } from '../structures/Bot';
type Member = GuildMember | PartialGuildMember;
declare const _default: {
    Bot: Record<string, {
        description: string;
        code: (b: Bot) => any;
    }>;
    Channel: Record<string, {
        description: string;
        code: (c: TextChannel | VoiceChannel) => any;
    }>;
    Guild: Record<string, {
        description: string;
        code: (g: Guild) => any;
    }>;
    Member: Record<string, {
        description: string;
        code: (m: Member) => any;
    }>;
    Message: Record<string, {
        description: string;
        code: (m: Message | PartialMessage) => any;
    }>;
    Role: Record<string, {
        description: string;
        code: (r: Role) => any;
    }>;
    Sticker: Record<string, {
        description: string;
        code: (s: Sticker) => any;
    }>;
    Thread: Record<string, {
        description: string;
        code: (t: AnyThreadChannel) => any;
    }>;
    User: Record<string, {
        description: string;
        code: (u: User) => any;
    }>;
};
export default _default;
