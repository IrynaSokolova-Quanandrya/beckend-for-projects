const db = require('../db/database')

exports.getBalance = (req, res) => {
	const { userId } = req.query

	const incomeQuery =
		'SELECT SUM(amount) as total FROM incomes WHERE userId = ?'
	const expenseQuery =
		'SELECT SUM(amount) as total FROM expenses WHERE userId = ?'

	db.get(incomeQuery, [userId], (err, income) => {
		db.get(expenseQuery, [userId], (err, expense) => {
			const balance = (income.total || 0) - (expense.total || 0)

			res.json({ balance })
		})
	})
}
