import API from "./API";

class User {
    static #currentUser: User | null = null;
    static get CurrentUser() {
        return User.#currentUser || User.fromLocalStorage();
    }
    static props = ["id", "email", "emailVerifiedOn", "pseudo", "role_id", "createdAt", "refresh", "access"];
    static Roles = [
        {code: 'Admin', file: 'account', value: 2},
        {code: 'User', file: 'account', value: 1}
    ];

    static fromLocalStorage() {
        const data = localStorage.getItem("user");
        if (!data) return null;
        const userInfos = JSON.parse(data);
        for (const prop of User.props) {
            if (userInfos[prop] === undefined)
                return null;
        }
        return new User(userInfos);
    }

    static forget() {
        localStorage.removeItem("user");
        User.#currentUser = null;
    }

    id = 1;
    email = "";
    emailVerifiedOn = "";
    pseudo = "";
    role_id = "";
    createdAt = "";
    lang = null;
    refresh = "";
    access = "";

    constructor(infos: any) {
        this.setInformations(infos);
        User.#currentUser = this;
    }

    setInformations(infos: any) {
        if (!infos) return;
        for (const prop of User.props) {
            if ((this as any)[prop] != infos[prop] && infos[prop] !== undefined) {
                (this as any)[prop] = infos[prop];
            }
        }
    }

    setTokens(tokens: any) {
        this.refresh = tokens.refresh ?? this.refresh;
        this.access = tokens.access ?? this.access;
    }

    save() {
        const userInfos: any = {};
        for (const prop of User.props) {
            userInfos[prop] = (this as any)[prop];
        }
        localStorage.setItem("user", JSON.stringify(userInfos));
        User.#currentUser = this;
    }

    getCredentials() {
        return new API.Credentials({token: "Bearer " + this.access, type: API.Credentials.TYPE.TOKEN});
    }
}

export default User;
