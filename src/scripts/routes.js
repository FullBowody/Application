export default {
    TOKEN: (...args) => "/auth/token" + (args.length ? "/" + args.join("/") : ""),
    REGISTER: (...args) => "/auth/register?token=" + args[0]
};