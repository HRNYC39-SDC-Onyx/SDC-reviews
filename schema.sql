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

CREATE INDEX r_p_id_index ON reviews(product_id);

CREATE TABLE IF NOT EXISTS characteristics
(
  id SERIAL PRIMARY KEY,
  product_id INT,
  name TEXT
);

CREATE INDEX c_p_id_index ON characteristics(product_id);

CREATE TABLE IF NOT EXISTS characteristics_reviews
(
  id SERIAL PRIMARY KEY,
  characteristics_id INT,
  review_id INT,
  value SMALLINT,
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);

CREATE INDEX cr_r_id_index ON characteristics_reviews(review_id);

CREATE TABLE IF NOT EXISTS photos
(
  id SERIAL PRIMARY KEY,
  review_id INT,
  url TEXT,
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);

CREATE INDEX p_r_id_index ON photos(review_id);

COPY reviews FROM '/Users/jaimie/Desktop/hrnyc39/SDC-reviews/data/reviews.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/Users/jaimie/Desktop/hrnyc39/SDC-reviews/data/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristics_reviews FROM '/Users/jaimie/Desktop/hrnyc39/SDC-reviews/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/jaimie/Desktop/hrnyc39/SDC-reviews/data/reviews_photos.csv' DELIMITER ',' CSV HEADER;
