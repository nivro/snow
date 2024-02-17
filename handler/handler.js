const { Client } = require('whatsapp-web.js');
const { Logger } = require("../logger");
const { DBHandler } = require("./db_handler.js")
const path = require("path")

const db_path = path.resolve(__dirname, '../db/db.db');

class Handler {

    /** 
    * @param {Client.message} message
    * @param {Logger} logger
    */
    constructor(whatsapp, logger) {

        this.logger = logger
        this.whatsapp = whatsapp

        this.db_handler = new DBHandler(db_path)

        this.whatsapp.client.on('message', async (message) => {
            this.message_handler(message)
        });

    }


    /**
     * the  function gets an whatsapp message,
     * preform logic and decides what to do
    * @param {Client.message} message
    */
    async message_handler(message) {
        var contact = await message.getContact();

        const allowed = await this.db_handler.is_contact_allowed(contact.number)
        if (allowed) {
            this.logger.info(`message from: ${contact.number} - ${message.body}`)
        } else {
            this.logger.error(`message from: ${contact.number} denied`)
        }


    }
}


module.exports = { Handler }