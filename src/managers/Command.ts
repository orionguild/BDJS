import { AdvancedCollection } from 'nekord-collection'
import { StringCommandTypes } from '../index'
import { lstat, readdir } from 'fs/promises'
import { Log } from '../util/Log'
import { join } from 'path'
import { randomUUID } from 'crypto'

interface CommandData {
    _path_?: string
    name?: string
    aliases?: string[]
    type: StringCommandTypes
    code: string
    [key: string]: unknown
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
     * Add a commands into the manager.
     * @param commands - Array of commands.
     * @returns {CommandManager}
     */
    add(...commands: CommandData[]) {
        for (const command of commands) {
            command._path_ = 'main_file'.toUpperCase()
            command.name = command.name ?? randomUUID()

            if (!command.code) {
                Log.error(`"${command.name}" can't be loaded!` + [
                    '|-> at: ' + command.name
                ].join('\n'))
                continue
            } else if (!this.#validateType(command.type)) {
                Log.error([
                    `Invalid command type "${command.type}" provided`,
                    '|-> at: ' + command._path_ + ' => ' + command.name,
                ].join('\n'))
                continue
            }
            
            this.set(
                command.name ?? randomUUID(),
                command
            )

        }
        return this
    }

    /**
     * Load all commands inside a directory.
     * @param dir - Commands directory.
     * @param providing_cwd - Set to "true" if your directory provides a custom cwd.
     */
    async load(dir: string, providing_cwd = false) {
        const root = providing_cwd ? '' : process.cwd()
        const files = await readdir(join(root, dir))

        this.#cwd = providing_cwd
        this.#directory = dir

        for (const file of files) {
            const stat = await lstat(join(root, dir, file))
            if (stat.isDirectory()) {
                await this.load(join(dir, file))
                continue
            }

            const command = require(join(root, dir, file)) as CommandData
            if (!('code' in command)) {
                Log.error(`"${file}" can't be loaded!` + [
                    '|-> at: ' + join(root, dir, file)
                ].join('\n'))
                continue
            } else if (!this.#validateType(command.type)) {
                Log.error([
                    `Invalid command type "${command.type}" provided`,
                    '|-> at: ' + join(root, dir, file)
                ].join('\n'))
                continue
            }

            this.set(
                command.name ?? randomUUID(),
                command
            )
        }

    }

    /**
     * Reload commands from source.
     * @returns {Promise<void>}
     */
    async reload() {
        if (!this.#directory) return Log.error('Cannot find a commands directory.')
        return await this.load(this.#directory, this.#cwd)
    }

    /**
     * Check if the provided command type is valid.
     * @param type - The command type.
     * @returns {boolean}
     */
    #validateType(type: StringCommandTypes) {
        const types = [
            'prefixed',
            'unprefixed',
            'ready',
            'unknown'
        ] as StringCommandTypes[]

        return types.includes(type)
    }
}