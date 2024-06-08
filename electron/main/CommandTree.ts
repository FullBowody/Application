export type TreePath = string[];
export enum Command {
    GET = "[GET]",
    SET = "[SET]",
    ADD = "[ADD]",
    REM = "[REM]",
}

export class CommandTree {
    static String2Path(str: string): TreePath {
        return str.split('/').filter(v => v);
    }

    static ParseCall(call: string): { command: Command, path: TreePath }{
        const command = call.substring(0, 5) as Command;
        const path = CommandTree.String2Path(call.substring(6));
        return { command, path };
    }

    tree: any;

    constructor(tree) {
        this.tree = tree;
    }

    search(path: TreePath) {
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
                    return root[key](...args);
                });
                console.log("IPCSetup for ", call, " done.");
            } else {
                this.setupIPC(ipcObj, root[key], `${path}${key}/`);
            }
        }
    }
}