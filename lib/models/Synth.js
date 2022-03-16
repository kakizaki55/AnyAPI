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
  static async findAll() {
    const { rows } = await pool.query(`
    SELECT * FROM synths
    `);
    return rows.map((row) => new Synth(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          synths
        WHERE
          id=$1
      `,
      [id]
    );
    return new Synth(rows[0]);
  }
  static async updateById(id, attributes) {
    const oldSynth = await Synth.findById(id);
    const newSynth = { ...oldSynth, ...attributes };
    const { make, model, year } = newSynth;
    const { rows } = await pool.query(
      `UPDATE
        synths
       SET
        make=$1,
        model=$2,
        year=$3 
    WHERE 
        id=$4 
    RETURNING 
        *
    `,
      [make, model, year, id]
    );
    return new Synth(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
          synths
        WHERE
          id=$1
        RETURNING
          *
        `,
      [id]
    );

    return new Synth(rows[0]);
  }
};
