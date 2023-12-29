"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
/**
 * Represents a message container.
 */
class Container {
    constructor() {
        this.files = [];
        this.components = [];
    }
    /**
     * Set the allowed mentions for this payload.
     * @param parse - Allow parse 'roles', 'users' and 'everyone'.
     * @param roles - Role snowflakes to be mentioned.
     * @param users - User snowflakes to be mentioned.
     * @param repliedUser - Mention the replied user?
     */
    setAllowedMentions(parse = [], roles = [], users = [], repliedUser = false) {
        this.allowedMentions = {
            parse,
            roles,
            users,
            repliedUser
        };
        return this;
    }
    /**
     * Set the payload content.
     * @param content - Payload content.
     */
    pushContent(content) {
        if (!this.content)
            this.content = '';
        this.content += content;
        return this;
    }
    /**
     * Adds a component data to this payload.
     * @param data - Component data.
     */
    addComponent(data) {
        if (!this.components)
            this.components = [];
        this.components.push(data);
        return this;
    }
    /**
     * Adds an embed to this payload.
     * @param data - Embed payload.
     */
    addEmbed(data) {
        if (!this.embeds)
            this.embeds = [];
        this.embeds?.push(data);
        return this;
    }
    /**
     * Adds a file data to this payload.
     * @param data - File payload.
     */
    addFile(data) {
        if (!this.files)
            this.files = [];
        this.files.push(data);
        return this;
    }
    /**
     * Clear the container.
     */
    clear() {
        this.allowedMentions = undefined;
        this.content = undefined;
        this.components = undefined;
        this.embeds = undefined;
        this.files = undefined;
    }
}
exports.Container = Container;
