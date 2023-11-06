interface TranslationFile {
    [key: string]: string | string[];
};
interface TranslationContext {
    file: string;
    code: string;
    format?: Record<string, string>;
};
type Callback = (a: any)=>void;

export default class Lang {
    static #browserLanguageCode?: string;
    static #fallbackLanguageCode = "en";
    static #translationFilesRootFolder = import.meta.env.DEV ? "/langs" : "./langs";

    static #fetchedTranslationFiles: Record<string, TranslationFile> = {};
    static #onlanguageChangeEvents: Callback[] = [];
    static #pendingTranslationFilesRequest: Record<string, Promise<TranslationFile>> = {};

    static async #getTranslationFile(filePath: string) {
        if (this.#fetchedTranslationFiles[filePath] === null)
            return null;
        if (this.#fetchedTranslationFiles[filePath] !== undefined) {
            return this.#fetchedTranslationFiles[filePath];
        }

        if (this.#pendingTranslationFilesRequest.hasOwnProperty(filePath)) {
            return await this.#pendingTranslationFilesRequest[filePath];
        }

        let resolveCallback: any = null;
        this.#pendingTranslationFilesRequest[filePath] = new Promise((resolve, reject) => { resolveCallback = resolve; });

        const data = await fetch(filePath);
        try {
            const json: TranslationFile = await data.json();
            this.#fetchedTranslationFiles[filePath] = json;
            resolveCallback?.(json);
            return json;
        } catch {
            delete this.#fetchedTranslationFiles[filePath];
            resolveCallback?.(null);
            return null;
        }
    }

    static #getFilePath(language: string, file: string) {
        return `${this.#getTranslationFilesRootFolder()}/${language}/${file}.json`
    }

    static #sanitizeLanguageCode(code: string) {
        if (!code) return undefined;
        if (code.length > 2) code = code.split("-")[0];
        if (code.length > 2) code = code.substring(0, 2);
        return code.toLowerCase();
    }

    static #getTranslationFilesRootFolder() {
        return this.#translationFilesRootFolder;
    }

    static #getFallbackLanguageCode() {
        return this.#fallbackLanguageCode;
    }

    static #setSavedLanguageCode(code?: string) {
        if (!code) localStorage.removeItem("lang");
        else localStorage.setItem("lang", code);
        this.#onlanguageChangeEvents.forEach((callback: Callback) => callback(code));
    }

    static #getSavedLanguageCode() {
        return localStorage.getItem("lang") ?? null;
    }

    static #retreiveBrowserLanguageCode() {
        this.#setBrowserLanguageCode(this.#sanitizeLanguageCode((navigator as any).language || (navigator as any).userLanguage))
    }

    static #getBrowserLanguageCode() {
        if (!this.#browserLanguageCode)
            this.#retreiveBrowserLanguageCode();
        return this.#browserLanguageCode;
    }

    static #setBrowserLanguageCode(code?: string) {
        this.#browserLanguageCode = code;
    }

    static #getFormatedText(text: string, format?: Record<string, string>) {
        if (!format) return text;
        for (const key in format) {
            if (text.includes(`{${key}}`))
                text = text.replace(`{${key}}`, format[key]);
        }
        return text;
    }

    static #processTranslation(translation: string|Array<string>) {
        if (typeof translation === "string") return translation;
        if (Array.isArray(translation)) return translation.join("\n");
        return JSON.stringify(translation);
    }

    static getLanguages() {
        return [
            { value: "en", name: "English" },
            { value: "fr", name: "Français" },
            { value: "",   name: "Auto"}
        ];
    }

    static getLanguage() {
        return this.#getSavedLanguageCode() ?? this.#getBrowserLanguageCode() ?? this.#getFallbackLanguageCode();
    }

    static setLanguage(value: string) {
        this.#setSavedLanguageCode(this.#sanitizeLanguageCode(value));
    }

    static registerOnLanguageChange(callback: Callback) {
        this.#onlanguageChangeEvents.push(callback);
    }

    static async TranslateAsync(context: TranslationContext) {
        if (!this.isValidContext(context)) {
            console.error("Invalid translation context : ", context);
            return null;
        }

        const filePath = this.#getFilePath(this.getLanguage(), context.file);
        const translationFile = await this.#getTranslationFile(filePath);
        if (translationFile && translationFile[context.code])
            return this.#processTranslation(translationFile[context.code]);

        const fallbackFilePath = this.#getFilePath(this.#getFallbackLanguageCode(), context.file);
        const fallbackTranslationFile = await this.#getTranslationFile(fallbackFilePath);
        if (fallbackTranslationFile && fallbackTranslationFile[context.code])
            return this.#processTranslation(fallbackTranslationFile[context.code]);

        console.error(
            "Translation not found for code [" + context.code + "] in file : [" + context.file + "]\n" +
            "Language : [" + this.getLanguage() + "]\n" +
            "Fallback language : [" + this.#getFallbackLanguageCode() + "]\n" +
            "Translation file : [" + filePath + "]\n" +
            "Fallback translation file : [" + fallbackFilePath + "]\n"
        );
        return null;
    }

    static async GetTextAsync(context: TranslationContext) {
        if (!context) return null;
        const translation = await this.TranslateAsync(context);
        if (!translation) return null;
        return this.#getFormatedText(translation, context.format);
    }

    static GetText(context: TranslationContext, callback: Callback) {
        this.GetTextAsync(context).then(callback);
    }

    static CreateTranslationContext(file: string, code: string, format?: Record<string, string>) {
        return {file, code, format: format ?? undefined} as TranslationContext;
    }

    static isValidContext(context: TranslationContext) {
        return context && context.file && context.code;
    }
}
