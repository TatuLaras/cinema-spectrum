import { baseUserDataDir } from './data_folders';

const fs = require('fs');

/**
 * A generic class for loading and saving json data on disk
 */
export class JsonLoader<T> {
    private data: T | null = null;
    private readonly file_path: string;
    private readonly default_value: T;

    constructor(filename: string, defaultValue: T) {
        this.file_path = baseUserDataDir + '/' + filename;
        this.default_value = defaultValue;
    }

    get(): T {
        if (!this.data) this.load();
        return this.data ?? this.default_value;
    }

    set(data: T) {
        this.data = data;
    }

    private load(): void {
        try {
            const fileContent = fs.readFileSync(this.file_path);
            this.data = JSON.parse(fileContent.toString());
        } catch {
            this.data = this.default_value;
        }
    }

    save(): void {
        if (!this.data) return;
        fs.writeFile(this.file_path, JSON.stringify(this.data), () => {});
    }
}
