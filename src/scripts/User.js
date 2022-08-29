class User {
    static #currentUser = null;
    static get CurrentUser() {
        return User.#currentUser || User.fromLocalStorage();
    }

    static fromLocalStorage() {
        const data = localStorage.getItem("user");
        if (!data) return null;
        return new User(JSON.parse(data));
    }

    static forget() {
        localStorage.removeItem("user");
        User.#currentUser = null;
    }

    username = "";
    password = "";
    email = "";
    icon = "";
    token = "";

    constructor(infos) {
        this.username = infos.username??this.username;
        this.password = infos.password??this.password;
        this.email = infos.email??this.email;
        this.token = infos.token??this.token;
        this.icon = infos.icon??this.icon;
        User.#currentUser = this;
    }

    save() {
        localStorage.setItem("user", JSON.stringify(this));
        User.#currentUser = this;
    }
}

window.User = User; // for debug
export default User;