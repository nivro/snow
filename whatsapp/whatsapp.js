const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const auth_folder = "auth-generated/"

class Whatsapp {


    constructor() {

        this.client = new Client({
            authStrategy: new LocalAuth({
                dataPath: auth_folder,
                clientId: 'client'
            })
        });

        this.client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log('Client is ready!');
        });

        this.client.initialize()

    }

    /**
     * sends a given message to given phone number
     *  @param {string } chatid
     *  @param {string } message
    */
    send_message(chatid, message) {
        this.client.sendMessage(chatid, message);
    }
}

module.exports = { Whatsapp }
