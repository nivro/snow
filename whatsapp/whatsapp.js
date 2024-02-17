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
}

module.exports = { Whatsapp }
