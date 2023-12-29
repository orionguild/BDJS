export declare class Generators {
    /**
     * Save StringEventNames type to a new file.
     */
    static eventNamesToFile(): void;
    /**
     * Get the documentation of a function.
     * @param output_dir - Output directory (without filename).
     */
    static getFunctionDoc(output_dir: string): Promise<void>;
    /**
     * Get the sidebar for documentation.
     * @param output_dir - Output directory (without filename).
     */
    static getSideBar(output_dir: string): Promise<void>;
    /**
     * Render a table of functions that supports builders.
     */
    static renderBuilders(): void;
    /**
     * Render a table including command types/descriptions
     */
    static renderCommands(): void;
    /**
     * Renders a table including event names and descriptions.
     */
    static renderEvents(): void;
    /**
     * Render a table of functions that supports injections.
     */
    static renderInjections(): void;
}
