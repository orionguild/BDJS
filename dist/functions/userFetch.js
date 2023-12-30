"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProperty = exports.isValidUserProperty = exports.UserProperties = void 0;
const Function_1 = require("../structures/Function");
var UserProperties;
(function (UserProperties) {
    UserProperties["isBot"] = "isBot";
    UserProperties["avatar"] = "avatar";
    UserProperties["id"] = "id";
    UserProperties["username"] = "username";
    UserProperties["displayName"] = "displayName";
    UserProperties["globalName"] = "globalName";
    UserProperties["banner"] = "banner";
    UserProperties["accentColor"] = "accentColor";
    UserProperties["timestamp"] = "timestamp";
    UserProperties["dmChannelID"] = "dmChannelID";
})(UserProperties || (exports.UserProperties = UserProperties = {}));
const isValidUserProperty = (property) => Object.values(UserProperties).includes(property);
exports.isValidUserProperty = isValidUserProperty;
function getUserProperty(user, property) {
    const data = JSON.parse(JSON.stringify(user));
    switch (property) {
        case 'isBot':
            return user.bot + '';
        case 'avatar':
            return user.displayAvatarURL();
        case 'id':
            return user.id;
        case 'username':
            return user.username;
        case 'displayName':
            return user.displayName;
        case 'globalName':
            return user.globalName;
        case 'banner':
            return user.bannerURL();
        case 'accentColor':
            return user.hexAccentColor;
        case 'timestamp':
            return user.createdTimestamp;
        case 'dmChannelID':
            return user.dmChannel?.id;
    }
}
exports.getUserProperty = getUserProperty;
exports.default = new Function_1.BaseFunction({
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
    code: async function (d, [property, memberID = d.ctx?.author?.id]) {
        if (property === undefined)
            throw new d.error(d, 'required', 'Property Name', d.function?.name);
        if (memberID === undefined)
            throw new d.error(d, 'invalid', 'User ID', d.function?.name);
        const user = await d.bot?.users.fetch(memberID);
        if (!user)
            throw new d.error(d, 'invalid', 'user', d.function?.name);
        if (!(0, exports.isValidUserProperty)(property))
            throw new d.error(d, 'invalid', 'Property', d.function?.name);
        return getUserProperty(user, property);
    }
});
