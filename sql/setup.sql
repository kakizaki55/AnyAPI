-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS synths;

  CREATE TABLE synths (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  make TEXT NOT NULL,
  model  TEXT NOT NULL,
  year INT NOT NULL CHECK (year > 1900)
  
);

INSERT INTO
  synths (make, model, year)
VALUES
  ('moog', 'sub37', 2015),
  ('korg', 'k2', 2000);
  