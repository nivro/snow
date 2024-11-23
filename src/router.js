const Authentication = require("./modules/authentiation/authentication")
const Admin = require("./modules/admin/admin")
const AI = require('./modules/ai/ai')
const createLogger = require('./helpers/logger')

class Router {
    constructor(config, db) {
        this.logger = createLogger()
        this.config = config
        this.db = db
        this.authentication = new Authentication(db)
        this.modules = {
            admin: new Admin(this.authentication),
            ai: new AI(this.config.ai)
        }
    }

    handle(message) {
        var phoneNumber = message.from.split('@')[0]
        if (!this.authentication.isContactAllowed(phoneNumber)) {
            this.logger.warn(`got message from unallowed user ${phoneNumber}`);
            return "Access to Snow denied"
        }
        return this.routeMessage(message)
    }

    routeMessage(message) {
        var command = message.body.split(' ')[0]
        if (!(command in this.modules)) {
            return `Unknown command!\navailable commands:\n${Object.keys(this.modules).join("\n")}`
        }
        return this.modules[command].handle(message)
    }
}

module.exports = Router