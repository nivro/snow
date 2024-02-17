const sqlite3 = require('sqlite3').verbose();

class DBHandler {
    constructor(db_path) {
        this.db = new sqlite3.Database(db_path);
    }

    is_contact_allowed(number) {
        return new Promise((resolve, reject) => {

            var query = "SELECT * FROM accounts where number = ?"
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