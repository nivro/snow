const createLogger = require('../../helpers/logger')

class BaseModule {
    static helpMessage = ""
    constructor() {
        this.logger = createLogger()
        this.commands = {}
    }

    handle(message) {
        if (message.body.split(' ').length == 1) {
            return this.constructor.helpMessage
        }
        var requestedCommand = message.body.split(' ').slice(1).join(' ')
        for (const command in this.commands) {
            if (requestedCommand.startsWith(command)) {
                return this.commands[command](requestedCommand.substring(command.length))
            }
        }
        return this.constructor.helpMessage
    }

}

module.exports = BaseModule;