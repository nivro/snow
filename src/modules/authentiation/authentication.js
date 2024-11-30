const createLogger = require('../../helpers/logger')
class Authentication {
  constructor (db) {
    this.logger = createLogger()
    this.db = db
  }

  isUserExists (phoneNumber) {
    const users = this.db.query('SELECT * FROM accounts WHERE number=?', [phoneNumber])
    return users.length === 1
  }

  isContactAllowed (phoneNumber) {
    return this.isUserExists(phoneNumber)
  }

  isUserAdmin (phoneNumber) {
    if (this.isUserExists(phoneNumber)) {
      const isAdmin = this.db.query('SELECT admin FROM accounts WHERE number=?', [phoneNumber])[0].admin
      return Boolean(isAdmin)
    }
    return false
  }

  createUser (phoneNumber) {
    this.db.run('INSERT INTO accounts (number, admin, muted) VALUES (?, 0, 0)', [phoneNumber])
  }

  deleteUser (phoneNumber) {
    this.db.run('DELETE FROM accounts WHERE number=?', [phoneNumber])
  }

  setAdminLevel (phoneNumber, isAdmin) {
    this.db.run('UPDATE accounts SET admin=? WHERE number=?', [isAdmin, phoneNumber])
  }

  listUsers () {
    return this.db.query('SELECT number FROM accounts')
  }
}

module.exports = Authentication
