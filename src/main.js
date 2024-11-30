const { MessageMedia } = require("whatsapp-web.js");
const Whatsapp = require("./whatsapp/whatsapp.js")
const SnowDB = require("./db/snow_db.js")
const Router = require("./router.js")
const createLogger = require("./helpers/logger.js");
const appConfig = require('./config/config');

class Snow {
    constructor(config) {
        this.logger = createLogger(config.logger);
        this.logger.info('starting snow')

        this.db = new SnowDB(config.db.path)
        this.whatsapp = new Whatsapp(config.whatsapp)
        this.router = new Router(config.modules, this.db)

        this.whatsapp.client.on('message', async (message) => {
            this.logger.info('received message')
            this.handle_maessage(message)
        });
    }
    async handle_maessage(message) {
        var response = await this.router.handle(message)
        if (response instanceof MessageMedia) {
            this.whatsapp.send_message(message.from, response)
        } else {
            var response_message = `Snow\n\n${response}`
            this.whatsapp.send_message(message.from, response_message)
        }

    }
}

function main() {
    new Snow(appConfig)
}

main()