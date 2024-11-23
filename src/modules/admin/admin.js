const BaseModule = require('../base/base')
class Admin extends BaseModule {
    static helpMessage = `Snow admin commands:
create user <number>\n
delete user <number>\n
add admin <number>\n
remove admin <number>\n
help\n
`
    constructor(authentication) {
        super()
        this.authentication = authentication
        this.commands = {
            'create user ': (phoneNumber) => this.createUser(phoneNumber),
            'delete user': (phoneNumber) => this.deleteUser(phoneNumber),
            'add admin': (phoneNumber) => this.addAdmin(phoneNumber),
            'remove admin': (phoneNumber) => this.removeAdmin(phoneNumber)
        };
    }

    handle(message) {
        var phoneNumber = message.from.split('@')[0]
        if (!this.authentication.isUserAdmin(phoneNumber)) {
            this.logger.error(`access denied for admin commands - ${phoneNumber}`)
            return "Access denied for admin commands"
        }
        return super.handle(message)
    }

    async createUser(phoneNumber) {
        if (this.authentication.isUserExists(phoneNumber)) {
            return `${phoneNumber} already exists`
        }
        this.logger.info(`creating user: ${phoneNumber}`)
        this.authentication.createUser(phoneNumber)
        return "user created"
    }
    async deleteUser(phoneNumber) {
        if (!this.authentication.isUserExists(phoneNumber)) {
            return `${phoneNumber} isn't exists`
        }
        this.authentication.deleteUser(phoneNumber)
        return "user deleted"
    }
    async addAdmin(phoneNumber) {
        if (!this.authentication.isUserExists(phoneNumber)) {
            return `${phoneNumber} isn't exists`
        }
        this.logger.info(`adding new admin: ${phoneNumber}`)
        this.authentication.setAdminLevel(phoneNumber, 1)
        return 'admin added'
    }
    async removeAdmin(phoneNumber) {
        if (!this.authentication.isUserExists(phoneNumber)) {
            return `${phoneNumber} isn't exists`
        }
        this.logger.info(`removing admin: ${phoneNumber}`)
        this.authentication.setAdminLevel(phoneNumber, 0)
        return 'admin removed'
    }
}

module.exports = Admin;