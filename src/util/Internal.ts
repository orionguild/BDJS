import { writeFileSync } from 'fs'
import { EventManager } from '../managers/Event'

export class Internal {
    /**
     * Save StringEventNames type to a new file.
     */
    eventNamesToFile() {
        const events = new EventManager(2)
        writeFileSync('./bdjs.events.txt', `
            export type StringEventNames = '${events.reformulatedNames.join('\'\n| \'')}'
        `.trim().split('\n').map(line => line.trim()).join('\n'))
    }
}