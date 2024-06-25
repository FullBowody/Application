export type CommandPath = string[];
export enum Command {
    GET = "[GET]",
    SET = "[SET]",
    ADD = "[ADD]",
    REM = "[REM]",
}

declare var ipc: any; // defined in preload.ts (for front-end)
export async function Execute(command: Command, path: CommandPath, ...args: any[]) {
    try {
        const res = await ipc.invoke(`${command}/${path.join("/")}`, ...args);
        return res;
    } catch (err) {
        console.error("Failed to execute command", `${command}/${path.join("/")}`);
        return null;
    }
}

export class CommandTree {
    static String2Path(str: string): CommandPath {
        return str.split('/').filter(v => v);
    }

    static ParseCall(call: string): { command: Command, path: CommandPath }{
        const command = call.substring(0, 5) as Command;
        const path = CommandTree.String2Path(call.substring(6));
        return { command, path };
    }

    tree: any;

    constructor(tree) {
        this.tree = tree;
    }

    search(path: CommandPath) {
        let current = this.tree;
        for (const p of path) {
            if (current[p] === undefined) {
                return null;
            }
            current = current[p];
        }
        return current;
    }

    handle(call: string, args: any[] = []) {
        const { command, path } = CommandTree.ParseCall(call);
        const node = this.search(path);
        if (node === null) {
            return null;
        }
        return node[command](...args);
    }

    setupIPC(ipcObj: any, root: any = this.tree, path: string = '/') {
        for (const key in root) {
            const isCommand = Object.values(Command).includes(key as Command);
            if (isCommand && typeof(root[key]) === 'function') {
                const call = `${key}${path.substring(0, path.length - 1)}`;
                ipcObj.handle(call, async (event, ...args) => {
                    const res = root[key](...args);
                    return res;
                });
            } else {
                this.setupIPC(ipcObj, root[key], `${path}${key}/`);
            }
        }
    }
}