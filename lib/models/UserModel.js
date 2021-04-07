const pool = require('../utils/pool');
// user requires id & username

module.exports = class User {
	id;
	userName;

	constructor({ id, user_name }) {
		this.id = id;
		this.userName = user_name;
	}

	static async insertUser(userName) {
		const { rows } = await pool.query(
			`INSERT INTO users(user_name)
            VALUES ($1)
            RETURNING *`,
			[userName]
		);
		return new User(rows[0]);
	}
};
