import { GuildMember, PartialGuildMember, User } from 'discord.js';
type Member = GuildMember | PartialGuildMember;
declare const _default: {
    Member: Record<string, {
        description: string;
        code: (m: Member) => any;
    }>;
    User: Record<string, {
        description: string;
        code: (u: User) => any;
    }>;
};
export default _default;
