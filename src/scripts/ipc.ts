import { Notif, addNotification } from "./notifications";

declare const ipc: any;

export function setupIPC() {
    ipc.on('notification', (event: any, args: any) => {
        addNotification(new Notif(args.type, args.title, args.message, args.duration));
    });
}
