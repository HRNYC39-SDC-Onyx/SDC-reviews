DROP DATABASE IF EXISTS reviewsdb;

CREATE DATABASE reviewsdb;

\c reviewsdb;

CREATE TABLE IF NOT EXISTS reviews
(
  id SERIAL PRIMARY KEY,
  product_id INT,
  rating SMALLINT,
  date DATE,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INT
);

CREATE TABLE IF NOT EXISTS characteristics
(
  id SERIAL,
  product_id INT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS characteristics_reviews
(
  id SERIAL,
  characteristics_id INT,
  review_id INT,
  value SMALLINT,
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);

CREATE TABLE IF NOT EXISTS photos
(
  id SERIAL,
  review_id INT,
  url TEXT,
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);

COPY reviews FROM '/Users/jaimie/Desktop/data/reviews.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/Users/jaimie/Desktop/data/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristics_reviews FROM '/Users/jaimie/Desktop/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/jaimie/Desktop/data/reviews_photos.csv' DELIMITER ',' CSV HEADER;
