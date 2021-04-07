const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('twit-bot CRRUD routes', () => {
	beforeEach(() => {
		return setup(pool);
	});

	beforeEach(async () => {
		const newUser = {
			userName: 'NessimaSkye',
		};

		await request(app).post('/api/v1/users').send(newUser);
	});

	it('POST: adds a new user to the DB', async () => {
		const { body } = await request(app)
			.post('/api/v1/users')
			.send({ userName: 'TunaBoatTony' });

		expect(body).toEqual({
			id: expect.any(String),
			userName: 'TunaBoatTony',
		});
	});

	it('GET: returns all users in the DB', async () => {
		const { body } = await request(app).get('/api/v1/users');

		expect(body).toEqual([
			{
				id: expect.any(String),
				userName: 'NessimaSkye',
			},
		]);
	});

	it('GET BY ID: returns a single user with the given ID', async () => {
		const { body } = await request(app).get('/api/v1/users/1');

		expect(body).toEqual({
			id: '1',
			userName: 'NessimaSkye',
		});
	});
});
