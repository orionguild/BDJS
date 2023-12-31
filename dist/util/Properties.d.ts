import { GuildMember, PartialGuildMember, Role, TextChannel, User, VoiceChannel } from 'discord.js';
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
    Member: Record<string, {
        description: string;
        code: (m: Member) => any;
    }>;
    Role: Record<string, {
        description: string;
        code: (r: Role) => any;
    }>;
    User: Record<string, {
        description: string;
        code: (u: User) => any;
    }>;
};
export default _default;
