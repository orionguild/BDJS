import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { Agent, request } from 'undici'
import { exec } from 'child_process'
import { Log } from '../util/Log'
import clc from 'cli-color'

export default new BaseEvent({
    name: 'onReady',
    description: 'Executed when client user is ready.',
    once: true,
    async listener(bot) {
        const autoUpdate = bot.extraOptions.autoUpdate ?? true
        const disableLogs = bot.extraOptions.disableLogs ?? false
        const currentVersion = (await import('../../package.json')).version

        const result = await request('https://registry.npmjs.org/bdjs', {
            dispatcher: new Agent({
                keepAliveTimeout: 10000,
                keepAliveMaxTimeout: 15000
            }),
            headers: {
                'User-Agent': 'bdjs'
            }
        })
        const npmdata = await result.body.json() as { 'dist-tags': { latest: string } }
        const fetchedVersion = npmdata['dist-tags'].latest

        if (fetchedVersion !== currentVersion && disableLogs === false) {
            Log.warn([
                'You are using an outdated version of BDJS!',
                'Last version: ' + fetchedVersion,
                'Current version: ' + currentVersion
                ].join('\n'))
        }
        
        if (autoUpdate) {
            const res = exec('npm i bdjs@latest', error => {
                if (error) {
                    Log.error([
                        'AutoUpdate Error',
                        JSON.stringify(error, null, 4)
                    ].join('\n'))
                } else {
                    Log.info([
                        'Updated successfully',
                        'Please reboot the process.'
                    ].join('\n'))
                    process.exit()
                }
            })
        }

        const commands = bot.commands.filter(command => command.type === 'ready')

        const data = new Data({
            commandType: 'ready',
            functions: bot.functions,
            instanceTime: new Date,
            reader: bot.reader
        })

        for (const command of commands) {
            await data.reader.compile(
                command.code,
                data
            ).catch(e => {
                Log.error(
                    JSON.stringify(e, null, 4)
                )
            })
        }

    }
})