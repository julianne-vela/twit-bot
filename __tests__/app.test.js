const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('twit-bot CRUD routes', () => {
	beforeEach(() => {
		return setup(pool);
	});

	it('takes in a username and adds a new user to the DB', async () => {
		const res = await request(app)
			.post('/api/v1/users')
			.send({ userName: 'NessimaSkye' });

		expect(res.body).toEqual({
			id: expect.any(String),
			user_name: 'NessimaSkye',
		});
	});
});
