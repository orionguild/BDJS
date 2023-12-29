"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Stops the execution for the remaining code.',
    code: async function (d) {
        d.stop = true;
    }
});
