import { BaseFieldOptions } from '../structures/Function'
import { EventManager } from '../managers/Event'
import { readdirSync, writeFileSync } from 'fs'
import { readdir, writeFile } from 'fs/promises'
import { AsciiTable3 } from 'ascii-table3'
import { BDJSLog } from './BDJSLog'
import { join } from 'path'

interface FunctionExtraOptions {
    /** If function supports builders. */
    builders: boolean
    /** If function supports injection. */
    injection: boolean
    /** Function parameters, if any. */
    params: BaseFieldOptions[]
}

/**
 * Represents a function documentation.
 */
class FunctionInfo {
    name: string;
    description: string;
    extraOptions: FunctionExtraOptions;
    constructor(name: string, description: string, extraOptions: FunctionExtraOptions) {
        this.name = name
        this.description = description
        this.extraOptions = extraOptions
    }

    /**
     * Returns the parameter table as string.
     */
    getParamTable() {
        const table = new AsciiTable3()
        .setHeading('Name', 'Description', 'Type', 'Default value')
        .addRowMatrix(this.extraOptions.params.map(x => {
            return [x.name, x.description, x.resolver ?? 'String', x.value]
        }))
        .setStyle('github-markdown')

        return table.toString()
    }

    /**
     * Get the function source.
     */
    async getSource() {
        const url = `https://raw.githubusercontent.com/Cyberghxst/bdjs/v1/src/functions/${this.name}.ts`
        const result = await fetch(url)
        if (!result.ok) return null
        const text = await result.text()
        return text
    }

    /**
     * Generates a markdown file from function data.
     */
    async toMD() {
        const args = (this.extraOptions.params?.length ?? 0) > 0 ? `## Parameters\n${this.getParamTable()}` : undefined
        const special = (this.extraOptions.builders && this.extraOptions.injection) ? `## Extra Data\n> Supports Builders\n> Supports Injection` : this.extraOptions.builders ? `## Extra Data\n> Supports Builders` : this.extraOptions.injection ? `## Extra Data\n> Supports Injection` : undefined
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
        ].filter(line => !!line).join('\n')
    }

    /**
     * Returns the function URL.
     */
    get url() {
        return `https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/${this.name}.ts`
    }

    /**
     * Get the function usage as string.
     */
    get usage() {
        const args = (this.extraOptions.params.length ?? 0) > 0 ? this.extraOptions.params.map(x => x.required ? x.name.toLowerCase() : x.name.toLowerCase() + '?') : []
        return `$${this.name + (args.length > 0 ? '[' + args.join(';') + ']' : '')}`
    }
}

export class Generators {
    /**
     * Save StringEventNames type to a new file.
     */
    static eventNamesToFile() {
        const events = new EventManager
        writeFileSync('./bdjs.events.txt', `
            export type StringEventNames = '${events.reformulatedNames.join('\'\n| \'')}'
        `.trim().split('\n').map(line => line.trim()).join('\n'))
    }

    /**
     * Get the documentation of a function.
     * @param output_dir - Output directory (without filename).
     */
    static async getFunctionDoc(output_dir: string) {
        const files = (await readdir(join(process.cwd(), 'dist/functions'))).filter(file => file.endsWith('.js'))
        for (const file of files) {
            BDJSLog.debug('Encoding ' + file)
            const func = require(join(process.cwd(), 'dist/functions', file)).default
            const doc = new FunctionInfo(file.slice(0, -3), func.description, {
                builders: func.builders ?? false,
                injection: func.injectable ?? false,
                params: func.parameters ?? []
            })
            await writeFile(join(process.cwd(), output_dir, file.replace('.js', '.md')), (await doc.toMD()))
        }
    }
    
    /**
     * Get the sidebar for documentation.
     * @param output_dir - Output directory (without filename).
     */
    static async getSideBar(output_dir: string) {
        const files = (await readdir(join(process.cwd(), 'dist/functions'))).filter(file => file.endsWith('.js'))
        await writeFile(join(process.cwd(), output_dir, 'sidebar.md'), `**Functions**\n${files.map(t => `* [$${t.slice(0, -3)}](functions/${t.slice(0,-3)}.md)`).join('\n')}`)
    }

    /**
     * Render a table of functions that supports builders.
     */
    static renderBuilders() {
        const table = new AsciiTable3()
        const descriptions: string[][] = []

        table.setHeading('Function name', 'Description')
        .setStyle('github-markdown')

        readdirSync('./dist/functions').forEach(file => {
            if (file.endsWith('.js')) {
                const path = join(process.cwd(), 'dist', 'functions', file)
                const event = require(path).default
                if (event.builders === true) {
                    descriptions.push(['$' + file.slice(0, -3), event.description])
                }
            }
        })

        table.addRowMatrix(descriptions)
        writeFileSync('./builders.descriptions.txt', table.toString())
    }

    /**
     * Render a table including command types/descriptions
     */
    static renderCommands() {
        const commandTypes = new AsciiTable3('Allowed command types')
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
        .setStyle('github-markdown')

        writeFileSync('./command.types.descriptions.txt', commandTypes.toString())
    }

    /**
     * Renders a table including event names and descriptions.
     */
    static renderEvents() {
        const eventDescriptions: string[][] = []
        const eventNames = new AsciiTable3()
        .setHeading('Name', 'Description');

        readdirSync('./dist/events').forEach(file => {
            if (file.endsWith('.js')) {
                const path = join(process.cwd(), 'dist', 'events', file)
                const event = require(path).default
                eventDescriptions.push([event.name, event.description])
            }
        })

        eventNames.addRowMatrix(eventDescriptions)
        .setStyle('github-markdown')

        writeFileSync('./event.names.descriptions.txt', eventNames.toString())
    }

    /**
     * Render a table of functions that supports injections.
     */
    static renderInjections() {
        const table = new AsciiTable3()
        const descriptions: string[][] = []

        table.setHeading('Function name', 'Description')
        .setStyle('github-markdown')

        readdirSync('./dist/functions').forEach(file => {
            if (file.endsWith('.js')) {
                const path = join(process.cwd(), 'dist', 'functions', file)
                const event = require(path).default
                if (event.injectable === true) {
                    descriptions.push(['$' + file.slice(0, -3), event.description])
                }
            }
        })

        table.addRowMatrix(descriptions)
        writeFileSync('./injection.descriptions.txt', table.toString())
    }
}