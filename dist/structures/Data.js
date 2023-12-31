"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const Function_1 = require("../managers/Function");
const Reader_1 = require("../core/Reader");
const CellParser_1 = require("../core/CellParser");
const Condition_1 = require("../util/Condition");
const BDJSLog_1 = require("../util/BDJSLog");
const Container_1 = require("./Container");
const Util_1 = require("../util/Util");
class Data {
    constructor(options) {
        this.bot = options.bot;
        this.code = '';
        this.env = options.env ?? {};
        this.functions = options.bot?.functions ?? options.functions ?? new Function_1.FunctionManager;
        this.commandType = options.commandType ?? 'unknown';
        this.compiled = {};
        this.function = {};
        this.container = options.container ?? new Container_1.Container;
        this.command = options.command;
        this.ctx = options.ctx;
        this.reader = options.reader ?? new Reader_1.Reader();
        this.stop = false;
        this.condition = Condition_1.Condition;
        this.cells = CellParser_1.CellParser;
        this.error = BDJSLog_1.BDJSLog;
        this.util = Util_1.Util;
    }
    /**
     * Deletes a environment variable from the cache.
     * @param {string} name - The variable name.
     * @returns {Data}
     */
    deleteEnvironmentVariable(name) {
        delete this.env[name];
        return this;
    }
    /**
     * Extends a parent data.
     * @param options - Data options to inherit.
     * @returns {Data}
     */
    extend(options) {
        return new Data({ ...options });
    }
    /**
     * Get a environment variable from the cache.
     * @param {string} name - The variable name.
     * @returns {unknown | undefined}
     */
    getEnvironmentVariable(name) {
        return this.env[name];
    }
    /**
     * Check if the variable name exists in the cache.
     * @param {string} name - The variable name.
     * @returns {boolean}
     */
    hasEnvironmentVariable(name) {
        return name in this.env;
    }
    /**
     * Set a environment variable in the cache.
     * @param {string} name - The variable name.
     * @param {unknown} value - The variable value.
     * @returns {Data}
     */
    setEnvironmentVariable(name, value) {
        this.env[name] = value;
        return this;
    }
    /**
     * Set the data result.
     * @param {string} text The compiled string result.
     * @returns {Data}
     */
    setCode(text) {
        this.code = text;
        return this;
    }
}
exports.Data = Data;
