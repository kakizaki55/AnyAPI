const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Synth = require('../lib/models/Synth');

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
    const expected = await Synth.findAll();
    const response = await request(app).get('/api/v1/synths');
    expect(response.body).toEqual(expected);
  });
  it('grabs a synth by an id', async () => {
    const expected = await Synth.findById(1);
    const response = await request(app).get(`/api/v1/synths/${expected.id}`);
    expect(response.body).toEqual({ ...expected });
  });
});
