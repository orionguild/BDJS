"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Return how many milliseconds took the Reader to interprete the code.',
    code: async function (d) {
        const start = d.getEnvironmentVariable('__BDJS__PERFORMANCE__');
        return (performance.now() - start).toString();
    }
});
