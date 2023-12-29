import DataBase from 'collie-db';
/**
 * Represents a variable manager.
 */
export declare class VariableManager<T extends unknown = DataBase> {
    _data: Record<string, Record<string, any>>;
    private tables;
    private db;
    constructor(tables: string[], db: T);
    /**
     * @private Add a variable table.
     * @param name Table name.
     */
    private addTable;
    /**
     * Fill a variable table.
     * @param data Variable entries.
     * @param table Table name.
     */
    fillTable(data: Record<string, any>, table: string): this;
    /**
     * Get a variable table.
     * @param name
     * @returns
     */
    getTable(name: string): Record<string, any>;
    /**
     * Check if the provided variable name exists.
     * @param name Variable name.
     * @param table Table name.
     * @returns {boolean}
     */
    checkVar(name: string, table: string): boolean;
    /**
     * Get a value from the database.
     * @param name Variable name.
     * @param table Table name.
     */
    get(name: string, table?: string): Promise<any>;
    /**
     * Set a value into the database.
     * @param name Variable name.
     * @param value Variable value.
     * @param table Table name.
     */
    set(name: string, value: any, table?: string): Promise<void>;
    /**
     * Check if the value exists in the database.
     * @param name Variable name.
     * @param table Table name.
     */
    has(name: string, table?: string): Promise<any>;
    /**
     * Delete a value from the database.
     * @param name Variable name.
     * @param table Table name.
     */
    delete(name: string, table?: string): Promise<any>;
}
