const db = require('../db/database')
const { v4: uuid } = require('uuid')

exports.register = (req, res) => {
	const { email, password } = req.body

	const id = uuid()

	const query = 'INSERT INTO users (id, email, password) VALUES (?, ?, ?)'

	db.run(query, [id, email, password], function (err) {
		if (err) {
			return res.status(400).json({ message: 'User already exists' })
		}
		res.status(201).json({ message: 'Registered' })
	})
}

exports.login = (req, res) => {
	const { email, password } = req.body

	const query = 'SELECT * FROM users WHERE email = ? AND password = ?'

	db.get(query, [email, password], (err, user) => {
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		res.json({
			message: 'Login success',
			userId: user.id,
		})
	})
}

exports.logout = (req, res) => {
	res.json({ message: 'Logout success' })
}
