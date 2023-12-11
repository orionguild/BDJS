import { BaseEvent } from '../structures/Event'
import { Data } from '../structures/Data'
import { Agent, request } from 'undici'
import { exec } from 'child_process'
import { BDJSLog } from '../util/BDJSLog'
import { inspect } from 'util'

export default new BaseEvent({
    name: 'onReady',
    description: 'Executed when client user is ready.',
    once: true,
    async listener(bot) {
        await bot.functions.load().then(() => {
            if (bot.extraOptions.debug === true) BDJSLog.debug(
                [
                    `${bot.functions.size} functions were loaded`,
                    '$' + bot.functions.keyArray().join(' - $')
                ].join('\n')
            )
        })

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
            BDJSLog.warn([
                'You are using an outdated version of BDJS!',
                'Last version: ' + fetchedVersion,
                'Current version: ' + currentVersion
                ].join('\n'))
        } else if (fetchedVersion === currentVersion && disableLogs === false) {
            BDJSLog.info([
                'Using the latest version of BDJS: ' + currentVersion
            ].join('\n'))
        }
        
        if (autoUpdate && fetchedVersion !== currentVersion) {
            const res = exec('npm i bdjs@latest', error => {
                if (error) {
                    BDJSLog.error([
                        'AutoUpdate Error',
                        JSON.stringify(error, null, 4)
                    ].join('\n'))
                } else {
                    BDJSLog.info([
                        'Updated successfully',
                        'Please reboot the process.'
                    ].join('\n'))
                    process.exit()
                }
            })
        }

        if (!bot.extraOptions.events.includes('onReady')) return;
        const commands = bot.commands.filter(command => command.type === 'ready')

        const data = new Data({
            bot,
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
                BDJSLog.error(inspect(e, { depth: 4 }))
            })
        }

        if (bot.status.size > 0) bot.status.rotate(data)
    }
})