import { GuildMember, PartialGuildMember } from "discord.js";
type Member = GuildMember | PartialGuildMember;
declare const _default: {
    Member: Record<string, {
        description: string;
        code: (member: Member) => any;
    }>;
};
export default _default;
