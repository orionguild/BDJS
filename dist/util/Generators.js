"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generators = void 0;
const Event_1 = require("../managers/Event");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const ascii_table3_1 = require("ascii-table3");
const BDJSLog_1 = require("./BDJSLog");
const path_1 = require("path");
/**
 * Represents a function documentation.
 */
class FunctionInfo {
    constructor(name, description, extraOptions) {
        this.name = name;
        this.description = description;
        this.extraOptions = extraOptions;
    }
    /**
     * Returns the parameter table as string.
     */
    getParamTable() {
        const table = new ascii_table3_1.AsciiTable3()
            .setHeading('Name', 'Description', 'Type', 'Default value')
            .addRowMatrix(this.extraOptions.params.map(x => {
            return [x.name, x.description, x.resolver ?? 'String', x.value];
        }))
            .setStyle('github-markdown');
        return table.toString();
    }
    /**
     * Get the function source.
     */
    async getSource() {
        const url = `https://raw.githubusercontent.com/Cyberghxst/bdjs/v1/src/functions/${this.name}.ts`;
        const result = await fetch(url);
        if (!result.ok)
            return null;
        const text = await result.text();
        return text;
    }
    /**
     * Generates a markdown file from function data.
     */
    async toMD() {
        const args = (this.extraOptions.params?.length ?? 0) > 0 ? `## Parameters\n${this.getParamTable()}` : undefined;
        const special = (this.extraOptions.builders && this.extraOptions.injection) ? `## Extra Data\n> Supports Builders\n> Supports Injection` : this.extraOptions.builders ? `## Extra Data\n> Supports Builders` : this.extraOptions.injection ? `## Extra Data\n> Supports Injection` : undefined;
        return [
            `# $${this.name}`,
            this.description,
            '## Usage',
            `> \`${this.usage}\``,
            args,
            special,
            /*'## Source Code',
            '```ts',
            await this.getSource(),
            '```',
            `Available on GitHub: [Click Here](${this.url})`*/
        ].filter(line => !!line).join('\n');
    }
    /**
     * Returns the function URL.
     */
    get url() {
        return `https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/${this.name}.ts`;
    }
    /**
     * Get the function usage as string.
     */
    get usage() {
        const args = (this.extraOptions.params.length ?? 0) > 0 ? this.extraOptions.params.map(x => x.required ? x.name.toLowerCase() : x.name.toLowerCase() + '?') : [];
        return `$${this.name + (args.length > 0 ? '[' + args.join(';') + ']' : '')}`;
    }
}
class Generators {
    /**
     * Save StringEventNames type to a new file.
     */
    static eventNamesToFile() {
        const events = new Event_1.EventManager;
        (0, fs_1.writeFileSync)('./bdjs.events.txt', `
            export type StringEventNames = '${events.reformulatedNames.join('\'\n| \'')}'
        `.trim().split('\n').map(line => line.trim()).join('\n'));
    }
    /**
     * Get the documentation of a function.
     * @param output_dir - Output directory (without filename).
     */
    static async getFunctionDoc(output_dir) {
        const files = (await (0, promises_1.readdir)((0, path_1.join)(process.cwd(), 'dist/functions'))).filter(file => file.endsWith('.js'));
        for (const file of files) {
            BDJSLog_1.BDJSLog.debug('Encoding ' + file);
            const func = require((0, path_1.join)(process.cwd(), 'dist/functions', file)).default;
            const doc = new FunctionInfo(file.slice(0, -3), func.description, {
                builders: func.builders ?? false,
                injection: func.injectable ?? false,
                params: func.parameters ?? []
            });
            await (0, promises_1.writeFile)((0, path_1.join)(process.cwd(), output_dir, file.replace('.js', '.md')), (await doc.toMD()));
        }
    }
    /**
     * Get the sidebar for documentation.
     * @param output_dir - Output directory (without filename).
     */
    static async getSideBar(output_dir) {
        const files = (await (0, promises_1.readdir)((0, path_1.join)(process.cwd(), 'dist/functions'))).filter(file => file.endsWith('.js'));
        await (0, promises_1.writeFile)((0, path_1.join)(process.cwd(), output_dir, 'sidebar.md'), `**Functions**\n${files.map(t => `* [$${t.slice(0, -3)}](functions/${t.slice(0, -3)}.md)`).join('\n')}`);
    }
    /**
     * Render a table of functions that supports builders.
     */
    static renderBuilders() {
        const table = new ascii_table3_1.AsciiTable3();
        const descriptions = [];
        table.setHeading('Function name', 'Description')
            .setStyle('github-markdown');
        (0, fs_1.readdirSync)('./dist/functions').forEach(file => {
            if (file.endsWith('.js')) {
                const path = (0, path_1.join)(process.cwd(), 'dist', 'functions', file);
                const event = require(path).default;
                if (event.builders === true) {
                    descriptions.push(['$' + file.slice(0, -3), event.description]);
                }
            }
        });
        table.addRowMatrix(descriptions);
        (0, fs_1.writeFileSync)('./builders.descriptions.txt', table.toString());
    }
    /**
     * Render a table including command types/descriptions
     */
    static renderCommands() {
        const commandTypes = new ascii_table3_1.AsciiTable3('Allowed command types')
            .setHeading('Name', 'Description')
            .addRowMatrix([
            ['ready', 'Executed when client user is ready.'],
            ['prefixed', 'Executed when a prefixed message is created.'],
            ['unprefixed', 'Executed when an unprefixed (command name without prefix) message is created.'],
            ['always', 'Executed when a message is created.'],
            ['anyInteraction', 'Executed when an interaction is created.'],
            ['buttonInteraction', 'Executed when a button interaction is created.'],
            ['selectMenuInteraction', 'Executed when a select menu interaction is created.'],
            ['commandInteraction', 'Executed when a command interaction is created.'],
            ['modalInteraction', 'Executed when a modal interaction is created.'],
            ['interval', 'Executed when an interval is emitted.'],
            ['timeout', 'Executed when a timeout is emitted.'],
            ['typingStart', 'Executed when someone starts typing in a guild channel.'],
            ['memberJoin', 'Executed when a new member joins a guild.'],
            ['memberLeave', 'Executed when a member leaves a guild.'],
            ['botJoin', 'Executed when bot joins a guild.'],
            ['botLeave', 'Executed when bot leaves a guild.']
        ])
            .setStyle('github-markdown');
        (0, fs_1.writeFileSync)('./command.types.descriptions.txt', commandTypes.toString());
    }
    /**
     * Renders a table including event names and descriptions.
     */
    static renderEvents() {
        const eventDescriptions = [];
        const eventNames = new ascii_table3_1.AsciiTable3()
            .setHeading('Name', 'Description');
        (0, fs_1.readdirSync)('./dist/events').forEach(file => {
            if (file.endsWith('.js')) {
                const path = (0, path_1.join)(process.cwd(), 'dist', 'events', file);
                const event = require(path).default;
                eventDescriptions.push([event.name, event.description]);
            }
        });
        eventNames.addRowMatrix(eventDescriptions)
            .setStyle('github-markdown');
        (0, fs_1.writeFileSync)('./event.names.descriptions.txt', eventNames.toString());
    }
    /**
     * Render a table of functions that supports injections.
     */
    static renderInjections() {
        const table = new ascii_table3_1.AsciiTable3();
        const descriptions = [];
        table.setHeading('Function name', 'Description')
            .setStyle('github-markdown');
        (0, fs_1.readdirSync)('./dist/functions').forEach(file => {
            if (file.endsWith('.js')) {
                const path = (0, path_1.join)(process.cwd(), 'dist', 'functions', file);
                const event = require(path).default;
                if (event.injectable === true) {
                    descriptions.push(['$' + file.slice(0, -3), event.description]);
                }
            }
        });
        table.addRowMatrix(descriptions);
        (0, fs_1.writeFileSync)('./injection.descriptions.txt', table.toString());
    }
}
exports.Generators = Generators;
