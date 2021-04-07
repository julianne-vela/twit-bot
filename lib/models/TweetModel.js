const pool = require('../utils/pool');
// tweet requires id, tweet, & linked user

module.exports = class Tweet {
	id;
	tweet;
	linkedUser;

	constructor({ id, tweet, linked_user }) {
		this.id = id;
		this.tweet = tweet;
		this.linkedUser = linked_user;
	}

	static async insertTweet(tweet, linkedUser) {
		const { rows } = pool.query(
			`INSERT INTO tweets(tweet, linked_user)
            VALUES ($1, $2)
            RETURNING *`,
			[tweet, linkedUser]
		);
		return new Tweet(rows[0]);
	}

	static async selectAllTweets() {
		const { rows } = pool.query(`SELECT * FROM tweets`);
		return tweets.map((tweet) => new Tweet(tweet));
	}
};
