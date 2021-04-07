const { Router } = require('express');
const Tweet = require('../models/TweetModel');

module.exports = Router().post('/create', async (req, res, next) => {
	try {
		const newTweet = await Tweet.insertTweet(req.body);

		res.send(newTweet);
	} catch (err) {
		next(err);
	}
});
