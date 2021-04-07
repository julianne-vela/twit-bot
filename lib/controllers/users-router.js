const { Router } = require('express');
const User = require('../models/UserModel');

module.exports = Router()
	.post('/', async (req, res, next) => {
		try {
			const newUser = await User.insertUser(req.body);

			res.send(newUser);
		} catch (err) {
			next(err);
		}
	})
	.get('/', async (req, res, next) => {
		try {
			const allUsers = await User.selectAllUsers();
			res.send(allUsers);
		} catch (err) {
			next(err);
		}
	});
