const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbPath = path.join(__dirname, 'database.db')

const db = new sqlite3.Database(dbPath, err => {
	if (err) {
		console.error('DB error:', err.message)
	} else {
		console.log('SQLite connected')
	}
})

// USERS
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT
  )
`)

// EXPENSES
db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY,
    userId TEXT,
    description TEXT,
    category TEXT,
    amount REAL,
    date TEXT
  )
`)

// INCOMES
db.run(`
  CREATE TABLE IF NOT EXISTS incomes (
    id TEXT PRIMARY KEY,
    userId TEXT,
    description TEXT,
    category TEXT,
    amount REAL,
    date TEXT
  )
`)

module.exports = db
