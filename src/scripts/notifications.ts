export class Notif {
    private static ID_COUNTER = 0;

    public type: string;
    public id: number;
    public title: string;
    public message: string;
    public duration: number;
    public deleted: boolean;
    public vue: any;

    constructor(type: string, title: string, message: string, duration: number = 1000) {
        this.type = type;
        this.id = Notif.ID_COUNTER++;
        this.title = title;
        this.message = message;
        this.duration = duration;
        this.deleted = true;
        setTimeout(() => {
            this.deleted = false;
            this.vue?.$forceUpdate();
        }, 20);
    }

    public delete() {
        if (!this || this.deleted) return;
        this.deleted = true;
        this.vue?.$forceUpdate();
    }

    public setVue(vue: any) {
        this.vue = vue;
    }
}

export const notifications: Notif[] = [];

export function addNotification(notif: Notif) {
    notifications.push(notif);
    setTimeout(() => {
        const index = notifications.findIndex(n => n.id === notif.id);
        if (index !== -1) {
            notifications[index].delete();
            setTimeout(() => {
                notifications.splice(index, 1);
            }, 510);
        }
    }, notif.duration);
}
