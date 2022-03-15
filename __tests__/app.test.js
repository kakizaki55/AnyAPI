const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    const res = await request(app).post('/api/v1/synths').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
