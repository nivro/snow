const createLogger = require('../helpers/logger')
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


class Whatsapp {
    constructor(config) {
        this.logger = createLogger()
        this.logger.info("starting snow whatsapp")
        this.client = new Client({
            authStrategy: new LocalAuth(config.clientConfig)
        });

        this.client.on('qr', (qr) => {
            this.logger.info("generating whatsapp QR")
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            this.logger.info("snow whatsapp created")
        });

        this.client.initialize()

    }

    send_message(chatid, message) {
        this.client.sendMessage(chatid, message);
    }
}

module.exports = Whatsapp
