"use strict";
var _FunctionManager_injections;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionManager = void 0;
const tslib_1 = require("tslib");
const Function_1 = require("../structures/Function");
const promises_1 = require("fs/promises");
const path_1 = require("path");
class FunctionManager extends Map {
    constructor() {
        super(...arguments);
        _FunctionManager_injections.set(this, {}
        /**
         * Load all functions from the native core.
         * @param {string} dir Function directory.
         * @returns {Promise<void>}
         */
        );
    }
    /**
     * Load all functions from the native core.
     * @param {string} dir Function directory.
     * @returns {Promise<void>}
     */
    async loadNatives() {
        const root = __dirname.replace('managers', 'functions'), files = await (0, promises_1.readdir)(root);
        for (const file of files) {
            if (file.endsWith('.js')) {
                const func = require((0, path_1.join)(root, file)).default;
                if (func instanceof Function_1.BaseFunction) {
                    const name = (file.startsWith('$')
                        ? file.slice(1, -3)
                        : file.slice(0, -3)).toLowerCase();
                    this.set(name, func);
                }
            }
        }
    }
    /**
     * Adds a function into the manager.
     * @param data - Array of functions.
     * @returns {FunctionManager}
     */
    add(...data) {
        for (const func of data) {
            const name = func.name.toLowerCase(), body = func;
            this.set(name.startsWith('$') ? name.slice(1) : name, body);
        }
        return this;
    }
    /**
     * Inject a subfunction into a function.
     * @param target - Function name where the function will be injected in.
     * @param name - Name of the function to be injected.
     * @param data - Data of the function to be injected.
     * @returns {FunctionManager}
     */
    inject(target, name, data) {
        tslib_1.__classPrivateFieldGet(this, _FunctionManager_injections, "f")[name.startsWith('$')
            ? name.slice(1).toLowerCase()
            : name.toLowerCase()] = {
            data,
            name: name.startsWith('$')
                ? name.slice(1).toLowerCase()
                : name.toLowerCase(),
            target: target.startsWith('$')
                ? target.slice(1).toLowerCase()
                : target.toLowerCase()
        };
        return this;
    }
    /**
     * Get all cached function injects.
     */
    get injections() {
        return tslib_1.__classPrivateFieldGet(this, _FunctionManager_injections, "f");
    }
}
exports.FunctionManager = FunctionManager;
_FunctionManager_injections = new WeakMap();
