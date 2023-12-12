import { AsciiTable3, AlignmentEnum } from 'ascii-table3'
import { AdvancedCollection } from 'nekord-collection'
import { Bot, SlashCommandBuilder, StringCommandTypes } from '../index'
import { lstat, readdir } from 'fs/promises'
import { randomUUID } from 'crypto'
import { BDJSLog } from '../util/BDJSLog'
import { join } from 'path'
import clc from 'cli-color'

export interface CommandData {
    _path_?: string
    data?: SlashCommandBuilder
    name?: string
    aliases?: string[]
    type: StringCommandTypes
    code: string
    [key: string]: unknown
}

interface CommandStatus {
    name: string,
    path: string,
    type: StringCommandTypes,
    status: 'Loaded' | 'Not loaded'
}

export class CommandManager extends AdvancedCollection<string, CommandData> {
    /**
     * Mark as "directory provides cwd".
     */
    #cwd = false

    /**
     * The load commands directory.
     */
    #directory: string | null = null

    /**
     * To save all loaded command statuses.
     */
    #commandStatus: CommandStatus[] = []

    /**
     * Add a commands into the manager.
     * @param commands - Array of commands.
     * @returns {CommandManager}
     */
    add(...commands: CommandData[]) {
        for (const command of commands) {
            if (!command._path_) command._path_ = 'main_file'.toUpperCase()
            command.name = command.name ?? randomUUID().slice(0, 13).toUpperCase()
            if (!command.code) {
                BDJSLog.error(`"${command.name}" can't be loaded!` + [
                    '|-> at: ' + command.name
                ].join('\n'))
                continue
            } else if (!this.#validateType(command.type)) {
                BDJSLog.error([
                    `Invalid command type "${command.type}" provided`,
                    '|-> at: ' + command._path_ + ' => ' + command.name,
                ].join('\n'))
                continue
            }
            this.set(command.name, command)
            this.#commandStatus.push({
                name: command.name,
                path: command._path_,
                type: command.type,
                status: 'Loaded'
            })
        }
        return this
    }

    /**
     * Load all commands inside a directory.
     * @param dir - Commands directory.
     * @param providing_cwd - Set to "true" if your directory provides a custom cwd.
     * @param log - BDJSLog commands.
     */
    async load(dir: string, providing_cwd = false, log = false) {
        const root = providing_cwd ? '' : process.cwd()
        const files = await readdir(join(root, dir))

        this.#cwd = providing_cwd
        this.#directory = dir

        for (const file of files) {
            const stat = await lstat(join(root, dir, file))
            if (stat.isDirectory()) {
                await this.load(join(dir, file), providing_cwd, false)
                continue
            }

            const command = require(join(root, dir, file)) as CommandData
            if (!('code' in command)) {
                BDJSLog.error(`"${file}" can't be loaded!` + [
                    '|-> at: ' + join(root, dir, file)
                ].join('\n'))
                continue
            } else if (!this.#validateType(command.type)) {
                BDJSLog.error([
                    `Invalid command type "${command.type}" provided`,
                    '|-> at: ' + join(root, dir, file)
                ].join('\n'))
                continue
            }

            // Ensure command name.
            command.name = command.name ?? randomUUID().slice(0, 13).toUpperCase()

            // Assign command path.
            command._path_ = join(root, dir, file)

            this.set(command.name, command)
            this.#commandStatus.push({
                name: command.name,
                path: command._path_,
                type: command.type,
                status: 'Loaded'
            })

            delete require.cache[require.resolve(join(root, dir, file))]
        }

        this.#logCommands()
    }

    /**
     * Reload commands from source.
     * @param bot - BDJS client.
     * @returns {Promise<void>}
     */
    async reload(bot: Bot) {
        if (!this.#directory) return BDJSLog.error('Cannot find a commands directory.')
        this.clear()
        return await this.load(this.#directory, this.#cwd, true)
    }

    /**
     * Check if the provided command type is valid.
     * @param type - The command type.
     * @returns {boolean}
     */
    #validateType(type: StringCommandTypes) {
        const types = this.types
        return types.includes(type)
    }

    /**
     * BDJSLog loaded commands.
     */
    #logCommands() {
        const rows: string[][] = []
        const table = new AsciiTable3('Commands')

        table.setHeading('Name', 'Type', 'Status', 'Path')
        .setAlign(2, AlignmentEnum.AUTO)
        .setStyle('compact')

        for (const data of this.#commandStatus) {
            rows.push([
                data.name,
                data.type,
                data.status === 'Loaded' ? clc.green('LOADED') : clc.red('NOT LOADED'),
                AsciiTable3.truncateString(data.path, 20)
            ])
        }

        table.addRowMatrix(rows)
        
        console.log(table.toString())
        this.#commandStatus.length = 0

        return this
    }

    /**
     * Return all valid command types.
     */
    get types(): StringCommandTypes[] {
        return [
            'always',
            'error',
            'prefixed',
            'unprefixed',
            'ready',
            'anyInteraction',
            'autocompleteInteraction',
            'buttonInteraction',
            'commandInteraction',
            'contextMenuInteraction',
            'modalInteraction',
            'selectMenuInteraction',
            'typing',
            'unknown',
            // BDJS Customs
            'interval',
            'timeout',
            'memberJoin',
            'memberLeave'
        ]
    }
}