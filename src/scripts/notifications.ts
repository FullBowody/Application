export class Notif {
    private static ID_COUNTER = 0;

    public type: string;
    public id: number;
    public title: string;
    public message: string;
    public duration: number;

    constructor(type: string, title: string, message: string, duration: number = 1000) {
        this.type = type;
        this.id = Notif.ID_COUNTER++;
        this.title = title;
        this.message = message;
        this.duration = duration;
    }
}

export const notifications: Notif[] = [];

export function addNotification(notif: Notif) {
    notifications.push(notif);
    setTimeout(() => {
        const index = notifications.findIndex(n => n.id === notif.id);
        if (index !== -1) notifications.splice(index, 1);
    }, notif.duration);
}
