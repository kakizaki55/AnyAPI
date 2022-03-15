const pool = require('../utils/pool');

module.exports = class Synth {
  id;
  make;
  model;
  year;
  constructor({ id, make, model, year }) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
  }

  static async insert({ make, model, year }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
      synths (make, model, year)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
    `,
      [make, model, year]
    );

    return new Synth(rows[0]);
  }
};
