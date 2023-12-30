import { BaseFunction } from '../structures/Function'
import { User } from 'discord.js'

export enum UserProperties {
    isBot = 'isBot',
    avatar = 'avatar',
    id = 'id',
    username = 'username',
    displayName = 'displayName',
    globalName = 'globalName',
    banner = 'banner',
    accentColor = 'accentColor',
    timestamp = 'timestamp',
    dmChannelID = 'dmChannelID'
}

export const isValidUserProperty = (property: UserProperties) => Object.values(UserProperties).includes(property)

export function getUserProperty(user: User & Record<string, any>, property: UserProperties) {
    const data = JSON.parse(JSON.stringify(user))
    switch (property) {
        case 'isBot':
            return user.bot + ''
        case 'avatar':
            return user.displayAvatarURL()
        case 'id':
            return user.id
        case 'username':
            return user.username
        case 'displayName':
            return user.displayName
        case 'globalName':
            return user.globalName
        case 'banner':
            return user.bannerURL()
        case 'accentColor':
            return user.hexAccentColor
        case 'timestamp':
            return user.createdTimestamp
        case 'dmChannelID':
            return user.dmChannel?.id
    }
}

export default new BaseFunction({
    description: 'Fetch an user property.',
    parameters: [
        {
            name: 'Property',
            description: 'User property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'User ID',
            description: 'User ID to fetch the property from.',
            required: true,
            resolver: 'String',
            value: 'd.ctx?.author?.id'
        }
    ],
    code: async function(d, [property, memberID = d.ctx?.author?.id]) {
        if (property === undefined) throw new d.error(d, 'required', 'Property Name', d.function?.name!)
        if (memberID === undefined) throw new d.error(d, 'invalid', 'User ID', d.function?.name!)

        const user = await d.bot?.users.fetch(memberID) as User & Record<string, string>
        if (!user) throw new d.error(d, 'invalid', 'user', d.function?.name!)

        if (!isValidUserProperty(property as UserProperties)) throw new d.error(d, 'invalid', 'Property', d.function?.name!)

        return getUserProperty(user, property as UserProperties)
    }
})