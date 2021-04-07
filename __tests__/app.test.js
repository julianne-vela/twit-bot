const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('twit-bot CRUD routes', () => {
	beforeEach(() => {
		return setup(pool);
	});

	it('takes in a username and adds a new user to the DB', async () => {
		const newUser = {
			userName: 'NessimaSkye',
		};

		const { body } = await request(app).post('/api/v1/users').send(newUser);

		expect(body).toEqual({
			id: expect.any(String),
			...newUser,
		});
	});

	it('returns all users in the DB', async () => {
		const { body } = await request(app).get('api/v1/users');

		expect(body).toEqual([
			{
				id: expect.any(String),
				userName: 'NessimaSkye',
			},
		]);
	});
});
