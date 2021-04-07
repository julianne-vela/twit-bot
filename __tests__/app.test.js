const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('twit-bot User CRRUD routes', () => {
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

	it('PUT: updates an existing user in the DB', async () => {
		const { body } = await request(app)
			.put('/api/v1/users/1')
			.send({ userName: 'TunaBoatTony' });

		expect(body).toEqual({
			id: '1',
			userName: 'TunaBoatTony',
		});
	});

	it('DELETE: deletes a user from the DB with the given ID', async () => {
		const { body } = await request(app).delete('/api/v1/users/1');

		expect(body).toEqual({
			id: '1',
			userName: 'NessimaSkye',
		});
	});
});

describe('twit-bot Tweet CRRUD routes', () => {
	beforeEach(() => {
		return setup(pool);
	});

	beforeEach(async () => {
		const newUser = {
			userName: 'NessimaSkye',
		};
		const newTweet = {
			tweet: 'This is my first tweet',
			linkedUser: '1',
		};

		await request(app).post('/api/v1/users').send(newUser);
		await request(app).post('/api/v1/tweets').send(newTweet);
	});

	it('GET: returns all tweets in the DB', async () => {
		const { body } = await request(app).get('/api/v1/tweets');

		expect(body).toEqual([
			{
				id: expect.any(String),
				tweet: 'This is my first tweet',
				linkedUser: '1',
			},
		]);
	});
});
