const Tweet = require('../models/TweetModel');
const User = require('../models/UserModel');

module.exports = class TweetService {
	static async createTweet(tweet, linkedUser) {
		const user = await User.selectUserById(linkedUser);

		if (user === 'invalid') {
			const newUser = await User.insertUser(user);
			id = newUser.id;
		} else {
			id = user.id;
		}

		const newTweet = await Tweet.insertTweet(tweet, linkedUser);

		return {
			details: 'New Tweet added Successfully!',
			data: newTweet,
		};
	}
};
