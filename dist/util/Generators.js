"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generators = void 0;
const promises_1 = require("fs/promises");
const ascii_table3_1 = require("ascii-table3");
const BDJSLog_1 = require("./BDJSLog");
const path_1 = require("path");
/**
 * Represents a function documentation.
 */
class FunctionInfo {
    constructor(name, description, extraOptions) {
        this.name = name;
        this.description = description;
        this.extraOptions = extraOptions;
    }
    /**
     * Returns the parameter table as string.
     */
    getParamTable() {
        const table = new ascii_table3_1.AsciiTable3()
            .setHeading('Name', 'Description', 'Type', 'Default value')
            .addRowMatrix(this.extraOptions.params.map(x => {
            return [x.name, x.description, x.resolver ?? 'String', x.value];
        }))
            .setStyle('github-markdown');
        return table.toString();
    }
    /**
     * Get the function source.
     */
    async getSource() {
        const url = `https://raw.githubusercontent.com/Cyberghxst/bdjs/v1/src/functions/${this.name}.ts`;
        const result = await fetch(url);
        if (!result.ok)
            return null;
        const text = await result.text();
        return text;
    }
    /**
     * Generates a markdown file from function data.
     */
    async toMD() {
        const args = (this.extraOptions.params?.length ?? 0) > 0 ? `## Parameters\n${this.getParamTable()}` : undefined;
        const special = (this.extraOptions.builders && this.extraOptions.injection) ? `## Extra Data\n> Supports Builders\n> Supports Injection` : this.extraOptions.builders ? `## Extra Data\n> Supports Builders` : this.extraOptions.injection ? `## Extra Data\n> Supports Injection` : undefined;
        return [
            `# $${this.name}`,
            this.description,
            '',
            '## Usage',
            `> \`${this.usage}\``,
            '',
            args,
            '',
            special,
            /*'## Source Code',
            '```ts',
            await this.getSource(),
            '```',
            `Available on GitHub: [Click Here](${this.url})`*/
        ].filter(line => !!line).join('\n');
    }
    /**
     * Returns the function URL.
     */
    get url() {
        return `https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/${this.name}.ts`;
    }
    /**
     * Get the function usage as string.
     */
    get usage() {
        const args = (this.extraOptions.params.length ?? 0) > 0 ? this.extraOptions.params.map(x => x.required ? x.name.toLowerCase() : x.name.toLowerCase() + '?') : [];
        return `$${this.name + (args.length > 0 ? '[' + args.join(';') + ']' : '')}`;
    }
}
/**
 * All BDJS documentation generator toolsets.
 */
class Generators {
    /**
     * Read functions and load its metadata.
     * @param input - Function path.
     * @param input_providing_cwd - Whether input includes a custom cwd.
     */
    static async loadFunctions(input, input_providing_cwd = false) {
        const files = (await (0, promises_1.readdir)((0, path_1.join)(input_providing_cwd ? '' : process.cwd(), input))).filter(file => file.endsWith('.js'));
        const loaded = [];
        for (const file of files) {
            const data = require((0, path_1.join)(input_providing_cwd ? '' : process.cwd(), input, file))['default'];
            if (!data) {
                BDJSLog_1.BDJSLog.error('Unable to read: ' + file);
                continue;
            }
            const doc = new FunctionInfo(file.slice(0, -3), data.description, {
                builders: data.builders ?? false,
                injection: data.injectable ?? false,
                params: data.parameters ?? []
            });
            loaded.push(doc);
        }
        return loaded;
    }
    /**
     * Generates documentation of every BDJS function.
     * @param input - Input directory for reading functions.
     * @param output - Ouput directory for markdown files.
     */
    static async documentFunctions(input, output) {
        let input_providing_cwd = input.endsWith(':providing_cwd');
        if (input_providing_cwd)
            input = input.replaceAll(':providing_cwd', '');
        let output_providing_cwd = output.endsWith(':providing_cwd');
        if (output_providing_cwd)
            output = output.replaceAll(':providing_cwd', '');
        const paths = output.split(/(\/|\\|\\\\)/g).filter(path => path.match(/\w+/));
        await (0, promises_1.mkdir)((0, path_1.join)(input_providing_cwd ? '' : process.cwd(), ...paths), { recursive: true });
        const accumulated = await Generators.loadFunctions(input, input_providing_cwd);
        accumulated && Generators.generateSideBar(accumulated, (0, path_1.join)(input_providing_cwd ? '' : process.cwd(), ...paths.slice(0, paths.length - 1)));
        for (const func of accumulated) {
            const content = await func.toMD();
            BDJSLog_1.BDJSLog.info(`Writing ${func.name}.md...`);
            (0, promises_1.writeFile)((0, path_1.join)(!output_providing_cwd ? '' : process.cwd(), ...paths, func.name + '.md'), content);
        }
    }
    /**
     * Generates the documentation sidebar.
     * @param accumulated - Array of loaded functions.
     * @param output - Output directory.
     * @param providing_cwd - Whether output includes a custom cwd.
     */
    static async generateSideBar(accumulated, output) {
        const contents = ['**Functions**'];
        for (const func of accumulated) {
            contents.push(`* [$${func.name}](functions/${func.name}.md)`);
        }
        await (0, promises_1.writeFile)((0, path_1.join)(output, 'sidebar.md'), contents.join('\n'));
    }
}
exports.Generators = Generators;
Generators.documentFunctions('./dist/functions', './autogenerated/functions');
