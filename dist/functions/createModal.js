"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Creates a modal.',
    parameters: [
        {
            name: 'Title',
            description: 'The title for this modal.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Custom ID',
            description: 'The custom ID for this modal',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Components',
            description: 'Components to be attached into the modal.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function (d, [title, customID, components]) {
        if (!(d.ctx?.raw instanceof discord_js_1.BaseInteraction))
            throw new d.error(d, 'disallowed', d.function?.name, 'interactions');
        if (!(d.ctx?.raw.isMessageComponent() || d.ctx?.raw.isCommand()))
            throw new d.error(d, 'disallowed', d.function?.name, 'message component/command interactions');
        if (title === undefined)
            throw new d.error(d, 'required', 'Title', d.function?.name);
        if (customID === undefined)
            throw new d.error(d, 'required', 'Custom ID', d.function?.name);
        if (components === undefined)
            throw new d.error(d, 'required', 'Components', d.function?.name);
        const modal = new discord_js_1.ModalBuilder;
        const data = d.extend(d);
        data.functions.add({
            name: 'createActionRow',
            description: 'Creates an action row for this modal component.',
            parameters: [
                {
                    name: 'Component',
                    description: 'Component to be attached into the modal.',
                    required: true,
                    compile: false,
                    resolver: 'String',
                    value: 'none'
                }
            ],
            async code(sub, [component]) {
                if (component === undefined)
                    throw new d.error(d, 'required', 'Component', d.function?.name);
                const row = new discord_js_1.ActionRowBuilder();
                const ex = sub.extend(sub);
                ex.functions.add({
                    name: 'addTextInput',
                    description: 'Adds a text input to the modal component.',
                    code: async (o, [customID, style, label, placeholder, min, max, required, value]) => {
                        if (customID === undefined)
                            throw new o.error(o, 'required', 'Custom ID', o.function?.name);
                        if (style === undefined)
                            throw new o.error(o, 'required', 'Style', o.function?.name);
                        if (!['short', 'paragraph'].includes(style.toLowerCase()))
                            throw new o.error(o, 'invalid', 'Style', o.function?.name);
                        if (label === undefined)
                            throw new o.error(o, 'required', 'Label', o.function?.name);
                        if (placeholder === undefined)
                            throw new o.error(o, 'required', 'Placeholder', o.function?.name);
                        const textInput = new discord_js_1.TextInputBuilder;
                        textInput.setCustomId(customID)
                            .setLabel(label)
                            .setPlaceholder(placeholder)
                            .setStyle(style.toLowerCase() === 'short' ? discord_js_1.TextInputStyle.Short : discord_js_1.TextInputStyle.Paragraph)
                            .setRequired(required === 'true');
                        if (min)
                            textInput.setMinLength(Number(min));
                        if (max)
                            textInput.setMaxLength(Number(max));
                        if (value)
                            textInput.setValue(value);
                        row.addComponents(textInput);
                    }
                });
                await ex.reader.compile(component, ex);
                modal.addComponents(row);
            }
        });
        modal.setTitle(title)
            .setCustomId(customID);
        await data.reader.compile(components, data);
        await d.ctx?.raw.showModal(modal);
    }
});
