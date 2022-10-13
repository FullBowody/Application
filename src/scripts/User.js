import API from "./API";

class User {
    static ROLE = {
        UNKNOWN: 0,
        ADMIN: 1,
        USER: 2,
        GUEST: 3
    }

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
    id = 0;
    role = User.ROLE.UNKNOWN;

    constructor(infos) {
        this.username = infos.username??this.username;
        this.password = infos.password??this.password;
        this.email = infos.email??this.email;
        this.token = infos.token??this.token;
        this.icon = infos.icon??this.icon;
        this.id = infos.id??this.id;
        this.role = infos.role??this.role;
        User.#currentUser = this;
    }

    getCredentials() {
        if (this.token.trim() != "")
            return API.Credentials.fromToken(this.token);
        return API.Credentials.fromUsernamePassword(this.username, this.password);
    }

    makeRequest(path, method=undefined, body=undefined, type=undefined, headers=undefined) {
        return new Promise((resolve, reject) => {
            const credentials = this.getCredentials();
            if (!credentials.isValid()) {
                reject("Invalid user credentials");
                return;
            }

            const req = (creds) => API.execute_logged(path, method, creds, body, type, headers);
            req(credentials).then(data => {
                resolve(data);
            }).catch(err => {
                if (err.status == 401) {
                    this.fetchToken().then((token) => {
                        req(API.Credentials.fromToken(token)).then(data => {
                            resolve(data);
                        }).catch(err => {
                            reject(err);
                        });
                    }).catch(err => {
                        reject(err);
                    });
                }
            });
        });
    }

    fetchToken() {
        return new Promise((resolve, reject) => {
            if (this.username.trim() == "" || this.password.trim() == "") {
                reject("Invalid user credentials");
                return;
            }

            API.execute(API.ROUTE.LOGIN, API.METHOD.POST, {username: this.username, password: this.password}).then(token => {
                this.token = token;
                this.save();
                resolve(token);
            }).finally(() => {
                
            }).catch(err => {
                switch (err.status) {
                    case 404:
                        reject("Invalid username");
                        break;
                    case 403:
                        reject("Invalid password");
                        break;
                    default:
                        reject("A problem occured");
                        break;
                }
            });
        });
    }

    fetchInformations() {
        return new Promise((resolve, reject) => {
            const credentials = this.getCredentials();
            if (!credentials.isValid()) {
                reject("Invalid user credentials");
                return;
            }

            this.makeRequest(API.ROUTE.ME).then(data => {
                this.username = data.username;
                this.email = data.email;
                this.save();
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    }

    save() {
        localStorage.setItem("user", JSON.stringify(this));
        User.#currentUser = this;
    }
}

window.User = User; // for debug
export default User;