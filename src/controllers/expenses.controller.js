const db = require('../db/database')
const { v4: uuid } = require('uuid')

exports.addExpense = (req, res) => {
	const { userId, description, category, amount } = req.body

	const expense = {
		id: uuid(),
		date: new Date().toISOString(),
	}

	const query = `
    INSERT INTO expenses (id, userId, description, category, amount, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `

	db.run(
		query,
		[expense.id, userId, description, category, amount, expense.date],
		() => res.status(201).json(expense)
	)
}

exports.getExpenses = (req, res) => {
	const { userId } = req.query

	db.all('SELECT * FROM expenses WHERE userId = ?', [userId], (err, rows) =>
		res.json(rows)
	)
}

exports.deleteExpense = (req, res) => {
	db.run('DELETE FROM expenses WHERE id = ?', [req.params.id], () =>
		res.json({ message: 'Deleted' })
	)
}
