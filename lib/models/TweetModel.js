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

	static async insertTweet({ tweet, linkedUser }) {
		const { rows } = await pool.query(
			`INSERT INTO tweets(tweet, linked_user)
            VALUES ($1, $2)
            RETURNING *`,
			[tweet, linkedUser]
		);
		return new Tweet(rows[0]);
	}

	static async selectAllTweets() {
		const { rows } = await pool.query(`SELECT * FROM tweets`);
		return rows.map((tweet) => new Tweet(tweet));
	}

	static async selectAllTweetsByUser(linkedUser) {
		const { rows } = await pool.query(
			`SELECT * FROM tweets
            WHERE linked_user=$1`,
			[linkedUser]
		);
		return rows.map((tweet) => new Tweet(tweet));
	}

	static async updateTweet(change, id) {
		const { rows } = await pool.query(
			`UPDATE tweets
            SET tweet = $1
            WHERE id=$2
            RETURNING *`,
			[change, id]
		);
		return new Tweet(rows[0]);
	}
};
