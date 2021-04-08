const { Router } = require('express');
const User = require('../models/UserModel');

module.exports = Router()
	.post('/add-user', async (req, res, next) => {
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
	})
	.get('/:id', async (req, res, next) => {
		try {
			const singleUser = await User.selectUserById(req.params.id);
			res.send(singleUser);
		} catch (err) {
			next(err);
		}
	})
	.put('/:id', async (req, res, next) => {
		try {
			const updatedUser = await User.updateUser(req.params.id);
			res.send(updatedUser);
		} catch (err) {
			next(err);
		}
	})
	.delete('/:id', async (req, res, next) => {
		try {
			const deletedUser = await User.deleteUser(req.params.id);
			res.send(deletedUser);
		} catch (err) {
			next(err);
		}
	});
