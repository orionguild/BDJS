"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    builders: true,
    description: 'Creates a new action row.',
    parameters: [
        {
            name: 'Components',
            description: 'Components to be attached into the action row.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [components]) {
        if (components === undefined)
            throw new d.error(d, 'required', 'components', d.function?.name);
        const row = new discord_js_1.ActionRowBuilder;
        const data = d.extend(d);
        data.functions.add({
            name: 'addButton',
            description: 'Adds a button into the row.',
            code: async (t, [customID, style, label, disabled = 'false', emoji]) => {
                if (customID === undefined)
                    throw new t.error(t, 'required', 'Custom ID', t.function?.name);
                if (style === undefined)
                    throw new t.error(t, 'required', 'Style', t.function?.name);
                const buttonStyles = {
                    primary: discord_js_1.ButtonStyle.Primary,
                    secondary: discord_js_1.ButtonStyle.Secondary,
                    success: discord_js_1.ButtonStyle.Secondary,
                    danger: discord_js_1.ButtonStyle.Danger,
                    link: discord_js_1.ButtonStyle.Link,
                    premium: discord_js_1.ButtonStyle.Premium
                };
                if (!Object.keys(buttonStyles).includes(style))
                    throw new t.error(t, 'invalid', 'Style', t.function?.name);
                const button = new discord_js_1.ButtonBuilder;
                if (style === 'link')
                    button.setURL(customID);
                else if (style === 'premium')
                    button.setSKUId(customID);
                else
                    button.setCustomId(customID);
                button.setStyle(buttonStyles[style])
                    .setDisabled(disabled === 'true');
                if (label)
                    button.setLabel(label);
                if (emoji)
                    button.setEmoji(emoji);
                row.addComponents(button);
            }
        }).add({
            name: 'addChannelMenu',
            description: 'Adds a channel select menu into the action row.',
            code: async (t, [customID, placeholder, min = '1', max, disabled = 'false', ...types]) => {
                if (customID === undefined)
                    throw new t.error(t, 'required', 'Custom ID', t.function?.name);
                if (placeholder === undefined)
                    throw new t.error(t, 'required', 'Placeholder', t.function?.name);
                if (isNaN(Number(min)) || Number(min) < 0)
                    throw new t.error(t, 'invalid', 'Minimum Options', t.function?.name);
                if (max && (isNaN(Number(max)) || Number(max) < 0 || Number(max) < Number(min)))
                    throw new t.error(t, 'invalid', 'Maximum Options', t.function?.name);
                const menu = new discord_js_1.ChannelSelectMenuBuilder;
                const channelTypes = {
                    announcement: discord_js_1.ChannelType.GuildAnnouncement,
                    category: discord_js_1.ChannelType.GuildCategory,
                    directory: discord_js_1.ChannelType.GuildDirectory,
                    forum: discord_js_1.ChannelType.GuildForum,
                    media: discord_js_1.ChannelType.GuildMedia,
                    text: discord_js_1.ChannelType.GuildText,
                    stagevoice: discord_js_1.ChannelType.GuildStageVoice,
                    voice: discord_js_1.ChannelType.GuildVoice
                };
                if (types) {
                    for (const type of types) {
                        if (!Object.keys(channelTypes).includes(type.toLowerCase()))
                            throw new d.error(d, 'invalid', 'Channel Type', d.function?.name);
                        menu.addChannelTypes(channelTypes[type.toLowerCase()]);
                    }
                }
                menu.setCustomId(customID)
                    .setDisabled(disabled === 'true')
                    .setMaxValues(Number(min))
                    .setPlaceholder(placeholder);
                if (max)
                    menu.setMaxValues(Number(max));
                row.addComponents(menu);
            }
        }).add({
            name: 'addMentionableMenu',
            description: 'Add a mentionable menu into the action row.',
            code: async (t, [customID, placeholder, min = '1', max, disabled = 'false', users, roles]) => {
                if (customID === undefined)
                    throw new t.error(t, 'required', 'Custom ID', t.function?.name);
                if (placeholder === undefined)
                    throw new t.error(t, 'required', 'Placeholder', t.function?.name);
                if (isNaN(Number(min)) || Number(min) < 0)
                    throw new t.error(t, 'invalid', 'Minimum Options', t.function?.name);
                if (max && (isNaN(Number(max)) || Number(max) < 0 || Number(max) < Number(min)))
                    throw new t.error(t, 'invalid', 'Maximum Options', t.function?.name);
                const menu = new discord_js_1.MentionableSelectMenuBuilder;
                menu.setCustomId(customID)
                    .setPlaceholder(placeholder)
                    .setMinValues(Number(min))
                    .setDisabled(disabled === 'true');
                if (max)
                    menu.setMaxValues(Number(max));
                // if (users) menu.addDefaultUsers(...users.split(',').map(id => id.trim()))
                // if (roles) menu.addDefaultRoles(...roles.split(',').map(id => id.trim()))
                row.addComponents(menu);
            }
        }).add({
            name: 'addRoleMenu',
            description: 'Add a role menu into the action row.',
            code: async (t, [customID, placeholder, min = '1', max, disabled = 'false']) => {
                if (customID === undefined)
                    throw new t.error(t, 'required', 'Custom ID', t.function?.name);
                if (placeholder === undefined)
                    throw new t.error(t, 'required', 'Placeholder', t.function?.name);
                if (isNaN(Number(min)) || Number(min) < 0)
                    throw new t.error(t, 'invalid', 'Minimum Options', t.function?.name);
                if (max && (isNaN(Number(max)) || Number(max) < 0 || Number(max) < Number(min)))
                    throw new t.error(t, 'invalid', 'Maximum Options', t.function?.name);
                const menu = new discord_js_1.RoleSelectMenuBuilder;
                menu.setCustomId(customID)
                    .setPlaceholder(placeholder)
                    .setMinValues(Number(min))
                    .setDisabled(disabled === 'true');
                if (max)
                    menu.setMaxValues(Number(max));
                row.addComponents(menu);
            }
        }).add({
            name: 'addStringMenu',
            description: 'Add a string select menu into the action row.',
            parameters: [
                // @ts-ignore
                undefined, undefined, undefined, undefined, undefined,
                {
                    name: 'Option Builders',
                    description: 'Builders to append options.',
                    compile: false,
                    required: false,
                    resolver: 'String',
                    value: 'none'
                }
            ],
            code: async (t, [customID, placeholder, min = '1', max, disabled = 'false', options]) => {
                if (customID === undefined)
                    throw new t.error(t, 'required', 'Custom ID', t.function?.name);
                if (placeholder === undefined)
                    throw new t.error(t, 'required', 'Placeholder', t.function?.name);
                if (isNaN(Number(min)) || Number(min) < 0)
                    throw new t.error(t, 'invalid', 'Minimum Options', t.function?.name);
                if (max && (isNaN(Number(max)) || Number(max) < 0 || Number(max) < Number(min)))
                    throw new t.error(t, 'invalid', 'Maximum Options', t.function?.name);
                const menu = new discord_js_1.StringSelectMenuBuilder;
                const optionValues = [];
                const cloned = t.extend(t);
                t.functions.add({
                    name: 'appendOption',
                    description: 'Appends an option to the menu.',
                    code: async (egg, [label, value, description, emoji, disabled = 'false']) => {
                        if (label === undefined)
                            throw new egg.error(egg, 'required', 'Option Label', egg.function?.name);
                        if (value === undefined)
                            throw new egg.error(egg, 'required', 'Option Value', egg.function?.name);
                        const opt = new discord_js_1.StringSelectMenuOptionBuilder;
                        opt.setLabel(label)
                            .setValue(value)
                            .setDefault(disabled === 'true');
                        if (description)
                            opt.setDescription(description);
                        if (emoji)
                            opt.setEmoji(emoji);
                        optionValues.push(opt);
                    }
                });
                await cloned.reader.compile(options, cloned);
                menu.setCustomId(customID)
                    .setPlaceholder(placeholder)
                    .setMinValues(Number(min))
                    .setDisabled(disabled === 'true');
                if (max)
                    menu.setMaxValues(Number(max));
                if (optionValues.length > 0)
                    menu.addOptions(optionValues);
                row.addComponents(menu);
            }
        }).add({
            name: 'addUserMenu',
            description: 'Add an user select menu into the action row.',
            code: async (t, [customID, placeholder, min = '1', max, disabled = 'false', options]) => {
                if (customID === undefined)
                    throw new t.error(t, 'required', 'Custom ID', t.function?.name);
                if (placeholder === undefined)
                    throw new t.error(t, 'required', 'Placeholder', t.function?.name);
                if (isNaN(Number(min)) || Number(min) < 0)
                    throw new t.error(t, 'invalid', 'Minimum Options', t.function?.name);
                if (max && (isNaN(Number(max)) || Number(max) < 0 || Number(max) < Number(min)))
                    throw new t.error(t, 'invalid', 'Maximum Options', t.function?.name);
                const menu = new discord_js_1.UserSelectMenuBuilder;
                menu.setCustomId(customID)
                    .setPlaceholder(placeholder)
                    .setMinValues(Number(min))
                    .setDisabled(disabled === 'true');
                if (max)
                    menu.setMaxValues(Number(max));
                row.addComponents(menu);
            }
        });
        await data.reader.compile(components, data);
        d.container.components?.push(row.toJSON());
    }
});
