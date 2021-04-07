const Tweet = require('../models/TweetModel');
const User = require('../models/UserModel');

module.exports = class TweetService {
	static async createTweet({ tweet, linkedUser }) {
		await checkUser(linkedUser);

		const newTweet = await Tweet.insertTweet(tweet, linkedUser);

		return {
			details: 'New Tweet added Successfully!',
			data: newTweet,
		};
	}

	static async getAllTweets() {
		const allTweets = await Tweet.selectAllTweets();

		return allTweets;
	}

	static async getAllTweetsByUser({ linkedUser }) {
		await checkUser(linkedUser);

		const allUserTweets = await Tweet.selectAllTweetsByUser(linkedUser);

		return allUserTweets;
	}
};

async function checkUser({ linkedUser }) {
	const user = await User.selectUserById(linkedUser);

	if (user === 'invalid') {
		const newUser = await User.insertUser(user);
		id = newUser.id;
	} else {
		id = user.id;
	}
}
