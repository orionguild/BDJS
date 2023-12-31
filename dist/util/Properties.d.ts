import { GuildMember, PartialGuildMember, Role, User } from 'discord.js';
type Member = GuildMember | PartialGuildMember;
declare const _default: {
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
