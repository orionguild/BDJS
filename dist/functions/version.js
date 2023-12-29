"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Returns the installed version of BDJS.',
    code: async function (d) {
        return (require('../../package.json')).version;
    }
});
