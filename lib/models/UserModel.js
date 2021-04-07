const pool = require('../utils/pool');
// user requires id & username

module.exports = class User {
	id;
	userName;

	constructor({ id, user_name }) {
		this.id = id;
		this.userName = user_name;
	}

	static async insertUser({ userName }) {
		const { rows } = await pool.query(
			`INSERT INTO users(user_name)
            VALUES ($1)
            RETURNING *`,
			[userName]
		);
		return new User(rows[0]);
	}

	static async selectAllUsers() {
		const { rows } = await pool.query('SELECT * FROM users');
		return rows.map((user) => new User(user));
	}

	static async selectUserById(id) {
		const { rows } = await pool.query(
			`SELECT * FROM users
            WHERE id=$1`,
			[id]
		);

		if (rows.length === 0) {
			return 'invalid';
		}

		return new User(rows[0]);
	}

	static async updateUser(id) {
		const { rows } = await pool.query(
			`UPDATE users
            SET user_name = 'TunaBoatTony'
            WHERE id=$1
            RETURNING *`,
			[id]
		);

		return new User(rows[0]);
	}
};
