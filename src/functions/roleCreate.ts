import { ColorResolvable, PermissionResolvable, PermissionsString, RoleCreateOptions, resolveColor } from 'discord.js'
import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    builders: true,
    injectable: false,
    description: 'Creates a role in a guild.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the role.',
            required: true,
            resolver: 'String',
            compile: true,
            value: 'none'
        },
        {
            name: 'Options',
            description: 'Builder functions to set role properties.',
            required: false,
            resolver: 'String',
            compile: false,
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild where role should be created.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        },
        {
            name: 'Return ID',
            description: 'Whether return role ID.',
            required: false,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function(d, [name, options, guildID = d.ctx?.guild?.id, returnID = 'false']) {
        if (name === undefined) throw new d.error(d, 'required', 'Texts', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild', d.function?.name!)

        const data = {} as RoleCreateOptions

        data.name = name

        if (options) {
            const subdata = d.extend(d)
            subdata.functions.set('setcolor', new BaseFunction({
                description: 'Set the color for this role.',
                code: async (t, [hex]) => {
                    if (hex === undefined) throw new t.error(d, 'required', 'color', t.function?.name!)
                    try {
                        const color = resolveColor(hex as ColorResolvable)
                        data.color = color
                    } catch (e) {
                        throw new t.error(t, 'custom', inspect(e, { depth: 1 }))
                    }
                }
            })).set('sethoist', new BaseFunction({
                description: 'Whether enable/disable role hoisting.',
                code: async (t, [hoist = 'true']) => {
                    data.hoist = hoist === 'true'
                }
            })).set('seticon', new BaseFunction({
                description: 'Set the icon for this role.',
                code: async (t, [source]) => {
                    if (source === undefined) throw new t.error(d, 'required', 'icon', t.function?.name!)
                    data.icon = source
                }
            })).set('setmentionable', new BaseFunction({
                description: 'Whether set this role as mentionable.',
                code: async (t, [mentionable = 'true']) => {
                    data.mentionable = mentionable === 'true'
                }
            })).set('setpermissions', new BaseFunction({
                description: 'Set the permissions for this role.',
                code: async (t, [...permissions]) => {
                    if (permissions[0] === undefined) throw new t.error(d, 'required', 'permission', t.function?.name!)
                    if (!t.util.validatePermissions(...permissions as PermissionsString[]))
                        throw new t.error(d, 'invalid', 'permission', t.function?.name!)
                    data.permissions = [...permissions as unknown as PermissionsString[]]
                }
            })).set('setposition', new BaseFunction({
                description: 'Set the position for this role.',
                code: async (t, [position]) => {
                    if (position === undefined) throw new t.error(d, 'required', 'position', t.function?.name!)
                    if (isNaN(Number(position)) || Number(position) < 1) throw new t.error(d, 'invalid', 'position', t.function?.name!)
                    data.position = Number(position)
                }
            })).set('setreason', new BaseFunction({
                description: 'Set the role creation reason.',
                code: async (t, [reason]) => {
                    if (reason === undefined) throw new t.error(d, 'required', 'reason', t.function?.name!)
                    data.reason = reason
                }
            }))

            await subdata.reader.compile(options, subdata)
        }

        const role = await guild.roles.create(data).then((r) => {
            return r
        }).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 1 }))
        })

        if (returnID === 'true' && role.id) return role.id
    }
})