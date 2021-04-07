const { Router } = require('express');
const TweetService = require('../services/TweetService');

module.exports = Router()
	.post('/create', async (req, res, next) => {
		try {
			const newTweet = await TweetService.createTweet(req.body);

			res.send(newTweet);
		} catch (err) {
			next(err);
		}
	})
	.get('/', async (req, res, next) => {
		try {
			const allTweets = await TweetService.getAllTweets();
			res.send(allTweets);
		} catch (err) {
			next(err);
		}
	})
	.get('/:linkedUser', async (req, res, next) => {
		try {
			const allUserTweets = await TweetService.getAllTweetsByUser(
				req.params.linkedUser
			);
			res.send(allUserTweets);
		} catch (err) {
			next(err);
		}
	})
	.put('/:id', async (req, res, next) => {
		try {
			const updatedTweet = await TweetService.changeTweet(
				req.params.id,
				req.params.change
			);
			res.send(updatedTweet);
		} catch (err) {
			next(err);
		}
	});
