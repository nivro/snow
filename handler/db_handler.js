const sqlite3 = require('sqlite3').verbose();
const sqlstring = require('sqlstring');

class DBHandler {
    constructor(db_path) {
        this.db = new sqlite3.Database(db_path);
    }

    /**
     * gets a phone number and checks if its allowed to use the bot
     * @param {int} number : the phone number
     * @returns is the number allowed
     */
    is_contact_allowed(number) {
        return new Promise((resolve, reject) => {

            var query = "SELECT * FROM accounts where number = ? and muted = 0"
            this.db.get(query, [number], (err, row) => {


                if (err) {
                    reject(err);
                } else if (!row) {
                    resolve(false)
                } else {
                    resolve(true);
                }
            });
        });
    }

}

module.exports = { DBHandler }