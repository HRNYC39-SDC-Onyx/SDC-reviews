# SDC-reviews
An API for everything FEC reviews related!

## Getting Started: 
1. Install PostgerSQL:
   - via Homebrew: https://formulae.brew.sh/formula/postgresql
   - via PostgreSQL website: https://www.postgresql.org/download/

2. Download the data onto your local machine. You need 4 files:
   - reviews.csv
   - characteristics.csv
   - characteristic_reviews.csv
   - reviews_photos.csv

## Installation:
1. Fork this repo to your account by clicking the 'FORK' button on the top right corner.

2. Navigate into the forked repo and clone it onto your local machine by clicking on the green 'CODE' button, selecting the 'HTTPS' tab and copying the link below it.

3. In your terminal, run the command `git clone LINK_TO_FORKED_REPO`

4. To open the repo on your local machine, `cd` into it and run `git code .` (this opens VS Code)

5. In the root directory, run the command `npm install` to install all of the app's dependencies.

## Setup
1. Create a `config.js` file using the provided `config.example.js` file with your postgreSQL credentials.

2. Navigate to the `schema.sql` file and **replace the file paths on line 55-58** with YOUR OWN FILE PATH to the data that you downloaded.

3. Run `npm start` in the root directory to run this project.

4. Run `npm createdb` in a seperate terminal window. This will create the database and tables for you in postgreSQL.

