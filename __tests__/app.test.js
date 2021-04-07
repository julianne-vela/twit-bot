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

		await request(app).post('/api/v1/users/add-user').send(newUser);
	});

	it('POST: adds a new user to the DB', async () => {
		const { body } = await request(app)
			.post('/api/v1/users/add-user')
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

		await request(app).post('/api/v1/users/add-user').send(newUser);
		await request(app).post('/api/v1/tweets/create').send(newTweet);
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

	it('GET: returns all tweets for a specific user', async () => {
		const secondTweet = {
			tweet: 'This is my second tweet',
			linkedUser: '1',
		};
		await request(app).post('/api/v1/tweets/create').send(secondTweet);

		const { body } = await request(app).get('/api/v1/tweets/1');

		expect(body).toEqual([
			{
				id: '1',
				tweet: 'This is my first tweet',
				linkedUser: '1',
			},
			{
				id: '2',
				tweet: 'This is my second tweet',
				linkedUser: '1',
			},
		]);
	});

	it('POST: adds a new tweet to the DB', async () => {
		const newTweet = {
			tweet: 'This is a new tweet',
			linkedUser: '1',
		};

		const { body } = await request(app)
			.post('/api/v1/tweets/create')
			.send(newTweet);

		expect(body).toEqual({
			details: 'New Tweet added Successfully!',
			data: { ...newTweet, id: expect.any(String) },
		});
	});

	it.skip('PUT: updates a tweet within the DB', async () => {
		const updatedTweet = {
			tweet: 'this is my UPDATED tweet',
			linkedUser: '1',
		};

		const { body } = await request(app)
			.put('/api/v1/tweets/1')
			.send(updatedTweet);

		expect(body).toEqual({
			id: '1',
			...updatedTweet,
		});
	});

	it('DELETE: removes a tweet from the DB', async () => {
		const deletedTweet = {
			id: '1',
			tweet: 'This is my first tweet',
			linkedUser: '1',
		};

		const { body } = await request(app).delete('/api/v1/tweets/1');

		expect(body).toEqual({
			details: 'Tweet removed successfully',
			data: deletedTweet,
		});
	});
});
