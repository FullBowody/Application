export default {
    TOKEN: (...args: any[]) => "/auth/token" + (args.length ? "/" + args.join("/") : ""),
    REGISTER: (...args: any[]) => "/auth/register?token=" + args[0]
};