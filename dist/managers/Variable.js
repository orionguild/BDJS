"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableManager = void 0;
/**
 * Represents a variable manager.
 */
class VariableManager {
    constructor(tables, db) {
        this._data = {};
        this.tables = [];
        for (const table of tables) {
            this.addTable(table);
        }
        this.db = db;
    }
    /**
     * @private Add a variable table.
     * @param name Table name.
     */
    addTable(name) {
        this._data[name] = {};
        this.tables.push(name);
        return this;
    }
    /**
     * Fill a variable table.
     * @param data Variable entries.
     * @param table Table name.
     */
    fillTable(data, table) {
        if (!this.tables.includes(table))
            throw new Error('Invalid table name provided!');
        for (const [key, value] of Object.entries(data)) {
            this._data[table][key] = typeof value === 'object' ? JSON.stringify(value) : typeof value !== 'string' ? value.toString() : value;
        }
        return this;
    }
    /**
     * Get a variable table.
     * @param name
     * @returns
     */
    getTable(name) {
        return this._data[name];
    }
    /**
     * Check if the provided variable name exists.
     * @param name Variable name.
     * @param table Table name.
     * @returns {boolean}
     */
    checkVar(name, table) {
        return name in this._data[table];
    }
    /**
     * Get a value from the database.
     * @param name Variable name.
     * @param table Table name.
     */
    async get(name, table = 'main') {
        return await this.db.get(table, name) ?? this._data[table][name];
    }
    /**
     * Set a value into the database.
     * @param name Variable name.
     * @param value Variable value.
     * @param table Table name.
     */
    async set(name, value, table = 'main') {
        await this.db.set(table, name, value);
    }
    /**
     * Check if the value exists in the database.
     * @param name Variable name.
     * @param table Table name.
     */
    async has(name, table = 'main') {
        return await this.db.has(table, name) && name in this._data[table];
    }
    /**
     * Delete a value from the database.
     * @param name Variable name.
     * @param table Table name.
     */
    async delete(name, table = 'main') {
        return await this.db.delete(table, name);
    }
}
exports.VariableManager = VariableManager;
