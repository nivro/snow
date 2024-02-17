const whatsapp_module = require("./whatsapp/whatsapp.js")
const handler_module = require("./handler/handler.js")
const logger_module = require("./logger.js")

function main() {
    var logger = new logger_module.Logger("./logs/log.log")

    var whatsapp = new whatsapp_module.Whatsapp()
    var handler = new handler_module.Handler(whatsapp, logger)

}

main()