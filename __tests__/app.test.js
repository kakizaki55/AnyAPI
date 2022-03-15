const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { findById, findAll } = require('../lib/models/Synth');

describe('AnyAPI routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a synth', async () => {
    const expected = {
      make: 'korg',
      model: 'some synth',
      year: 2017,
    };
    const response = await request(app).post('/api/v1/synths').send(expected);
    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of synths', async () => {
    const expected = await findAll();
    const response = await request(app).get('/api/v1/synths');
    expect(response.body).toEqual(expected);
  });
  it('grabs a synth by an id', async () => {
    const expected = await findById(1);
    const response = await request(app).get(`/api/v1/synths/${expected.id}`);
    expect(response.body).toEqual({ ...expected });
  });

  it('updates synth by its ID', async () => {
    const expected = {
      id: expect.any(String),
      make: 'atari',
      model: 'ian',
      year: 1991,
    };
    const response = await request(app)
      .patch('/api/v1/synths/1')
      .send({ make: 'atari', model: 'ian', year: 1991 });
    expect(response.body).toEqual(expected);
  });

  it('deletes an synth by its id', async () => {
    const expected = await findById(1);
    const response = await request(app).delete('/api/v1/synths/1');

    expect(response.body).toEqual(expected);
  });
});
