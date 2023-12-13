import { 
    ActionRowBuilder, ButtonBuilder, ButtonStyle, 
    ChannelSelectMenuBuilder, ChannelType, 
    MentionableSelectMenuBuilder, RoleSelectMenuBuilder,
    StringSelectMenuBuilder, StringSelectMenuOptionBuilder, UserSelectMenuBuilder
} from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
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
    code: async function(d, [components]) {
        if (components === undefined) throw new d.error(d, 'required', 'components', d.function?.name!)
        const row = new ActionRowBuilder

        const data = d.extend(d)
        data.functions.add({
            name: 'addButton',
            description: 'Adds a button into the row.',
            code: async (t, [customID, style, label, disabled = 'false', emoji]) => {
                if (customID === undefined) throw new t.error(t, 'required', 'Custom ID', t.function?.name!)
                if (style === undefined) throw new t.error(t, 'required', 'Style', t.function?.name!)

                const buttonStyles = {
                    primary: ButtonStyle.Primary,
                    secondary: ButtonStyle.Secondary,
                    success: ButtonStyle.Secondary,
                    danger: ButtonStyle.Danger,
                    link: ButtonStyle.Link
                } as Record<string, any>

                if (!Object.keys(buttonStyles).includes(style)) throw new t.error(t, 'invalid', 'Style', t.function?.name!)

                const button = new ButtonBuilder
                
                button[style === 'link' ? 'setURL' : 'setCustomId'](customID)
                .setStyle(buttonStyles[style])
                .setDisabled(disabled === 'true')
                
                if (label) button.setLabel(label)
                if (emoji) button.setEmoji(emoji)
                

                row.addComponents(button)
            }
        }).add({
            name: 'addChannelMenu',
            description: 'Adds a channel select menu into the action row.',
            code: async(t, [customID, placeholder, min = '1', max, disabled = 'false', ...types]) => {
                if (customID === undefined) throw new t.error(t, 'required', 'Custom ID', t.function?.name!)
                if (placeholder === undefined) throw new t.error(t, 'required', 'Placeholder', t.function?.name!)
                if (isNaN(Number(min)) || Number(min) < 0) throw new t.error(t, 'invalid', 'Minimum Options', t.function?.name!)
                if (max && (isNaN(Number(max)) || Number(max) < 0 || Number(max) < Number(min))) throw new t.error(t, 'invalid', 'Maximum Options', t.function?.name!)

                const menu = new ChannelSelectMenuBuilder
                const channelTypes: Record<string, any> = {
                    announcement: ChannelType.GuildAnnouncement,
                    category: ChannelType.GuildCategory,
                    directory: ChannelType.GuildDirectory,
                    forum: ChannelType.GuildForum,
                    media: ChannelType.GuildMedia,
                    text: ChannelType.GuildText,
                    stagevoice: ChannelType.GuildStageVoice,
                    voice: ChannelType.GuildVoice
                }
                
                if (types) {
                    for (const type of types) {
                        if (!Object.keys(channelTypes).includes(type.toLowerCase())) throw new d.error(d, 'invalid', 'Channel Type', d.function?.name!)
                        menu.addChannelTypes(channelTypes[type.toLowerCase()] as any)
                    }
                }

                menu.setCustomId(customID)
                .setDisabled(disabled === 'true')
                .setMaxValues(Number(min))
                .setPlaceholder(placeholder)

                if (max) menu.setMaxValues(Number(max))

                row.addComponents(menu)
            }
        }).add({
            name: 'addMentionableMenu',
            description: 'Add a mentionable menu into the action row.',
            code: async (t, [customID, placeholder, min = '1', max, disabled = 'false', users, roles]) => {
                if (customID === undefined) throw new t.error(t, 'required', 'Custom ID', t.function?.name!)
                if (placeholder === undefined) throw new t.error(t, 'required', 'Placeholder', t.function?.name!)
                if (isNaN(Number(min)) || Number(min) < 0) throw new t.error(t, 'invalid', 'Minimum Options', t.function?.name!)
                if (max && (isNaN(Number(max)) || Number(max) < 0 || Number(max) < Number(min))) throw new t.error(t, 'invalid', 'Maximum Options', t.function?.name!)

                const menu = new MentionableSelectMenuBuilder
                menu.setCustomId(customID)
                .setPlaceholder(placeholder)
                .setMinValues(Number(min))
                .setDisabled(disabled === 'true')

                if (max) menu.setMaxValues(Number(max))
                // if (users) menu.addDefaultUsers(...users.split(',').map(id => id.trim()))
                // if (roles) menu.addDefaultRoles(...roles.split(',').map(id => id.trim()))

                row.addComponents(menu)
            }
        }).add({
            name: 'addRoleMenu',
            description: 'Add a role menu into the action row.',
            code: async (t, [customID, placeholder, min = '1', max, disabled = 'false']) => {
                if (customID === undefined) throw new t.error(t, 'required', 'Custom ID', t.function?.name!)
                if (placeholder === undefined) throw new t.error(t, 'required', 'Placeholder', t.function?.name!)
                if (isNaN(Number(min)) || Number(min) < 0) throw new t.error(t, 'invalid', 'Minimum Options', t.function?.name!)
                if (max && (isNaN(Number(max)) || Number(max) < 0 || Number(max) < Number(min))) throw new t.error(t, 'invalid', 'Maximum Options', t.function?.name!)

                const menu = new RoleSelectMenuBuilder
                menu.setCustomId(customID)
                .setPlaceholder(placeholder)
                .setMinValues(Number(min))
                .setDisabled(disabled === 'true')

                if (max) menu.setMaxValues(Number(max))

                row.addComponents(menu)
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
                if (customID === undefined) throw new t.error(t, 'required', 'Custom ID', t.function?.name!)
                if (placeholder === undefined) throw new t.error(t, 'required', 'Placeholder', t.function?.name!)
                if (isNaN(Number(min)) || Number(min) < 0) throw new t.error(t, 'invalid', 'Minimum Options', t.function?.name!)
                if (max && (isNaN(Number(max)) || Number(max) < 0 || Number(max) < Number(min))) throw new t.error(t, 'invalid', 'Maximum Options', t.function?.name!)

                const menu = new StringSelectMenuBuilder
                const optionValues: StringSelectMenuOptionBuilder[] = []

                const cloned = t.extend(t)
                t.functions.add({
                    name: 'appendOption',
                    description: 'Appends an option to the menu.',
                    code: async (egg, [label, value, description, emoji, disabled = 'false']) => {
                        if (label === undefined) throw new egg.error(egg, 'required', 'Option Label', egg.function?.name!)
                        if (value === undefined) throw new egg.error(egg, 'required', 'Option Value', egg.function?.name!)

                        const opt = new StringSelectMenuOptionBuilder
                        opt.setLabel(label)
                        .setValue(value)
                        .setDefault(disabled === 'true')
                        
                        if (description) opt.setDescription(description)
                        if (emoji) opt.setEmoji(emoji)

                        optionValues.push(opt)
                    }
                })

                await cloned.reader.compile(options, cloned)

                menu.setCustomId(customID)
                .setPlaceholder(placeholder)
                .setMinValues(Number(min))
                .setDisabled(disabled === 'true')

                if (max) menu.setMaxValues(Number(max))
                if (optionValues.length > 0) menu.addOptions(optionValues)

                row.addComponents(menu)
            }
        }).add({
            name: 'addUserMenu',
            description: 'Add an user select menu into the action row.',
            code: async (t, [customID, placeholder, min = '1', max, disabled = 'false', options]) => {
                if (customID === undefined) throw new t.error(t, 'required', 'Custom ID', t.function?.name!)
                if (placeholder === undefined) throw new t.error(t, 'required', 'Placeholder', t.function?.name!)
                if (isNaN(Number(min)) || Number(min) < 0) throw new t.error(t, 'invalid', 'Minimum Options', t.function?.name!)
                if (max && (isNaN(Number(max)) || Number(max) < 0 || Number(max) < Number(min))) throw new t.error(t, 'invalid', 'Maximum Options', t.function?.name!)

                const menu = new UserSelectMenuBuilder

                menu.setCustomId(customID)
                .setPlaceholder(placeholder)
                .setMinValues(Number(min))
                .setDisabled(disabled === 'true')

                if (max) menu.setMaxValues(Number(max))

                row.addComponents(menu)
            }
        });

        await data.reader.compile(components, data)

        d.container.components?.push(row.toJSON() as any)
    }
})