CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  uuid UUID NOT NULL
);

CREATE TABLE json_data (
  name TEXT NOT NULL PRIMARY KEY,
  userId UUID NOT NULL,
  data JSONB NOT NULL
);

CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    originallink TEXT,
    shortLink TEXT
);