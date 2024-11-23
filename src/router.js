const Authentication = require("./modules/authentiation/authentication")
const Admin = require("./modules/admin/admin")
const createLogger = require('./helpers/logger')
const command = require("nodemon/lib/config/command")

class Router {
    constructor(config, db) {
        this.logger = createLogger()
        this.config = config
        this.db = db
        this.authentication = new Authentication(db)

        this.modules = {
            admin: new Admin(this.authentication),
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