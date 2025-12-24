const db = require('../db/database')
const { v4: uuid } = require('uuid')

exports.addIncomes = (req, res) => {
	const { userId, description, category, amount } = req.body

	const income = {
		id: uuid(),
		date: new Date().toISOString(),
	}

	const query = `
    INSERT INTO incomes (id, userId, description, category, amount, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `

	db.run(
		query,
		[income.id, userId, description, category, amount, income.date],
		() => res.status(201).json(income)
	)
}

exports.getIncomes = (req, res) => {
	const { userId } = req.query

	db.all('SELECT * FROM incomes WHERE userId = ?', [userId], (err, rows) =>
		res.json(rows)
	)
}

exports.deleteIncome = (req, res) => {
	db.run('DELETE FROM incomes WHERE id = ?', [req.params.id], () =>
		res.json({ message: 'Deleted' })
	)
}
