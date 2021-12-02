# SDC-reviews
An API for everything FEC reviews related!

## Getting Started: 
1. Install Git:
   - via Git website: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

2. Install PostgreSQL:
   - via Homebrew: https://formulae.brew.sh/formula/postgresql
   - via PostgreSQL website: https://www.postgresql.org/download/

3. Download the data onto your local machine. You need 4 files:
   - reviews.csv
   - characteristics.csv
   - characteristic_reviews.csv
   - reviews_photos.csv

## Installation:
1. Fork this repo to your account by clicking the 'FORK' button on the top right corner.

2. Navigate into the forked repo and clone it onto your local machine by clicking on the green 'CODE' button, selecting the 'HTTPS' tab and copying the link below it.

3. In the directory on your local machine that you wish to clone the repo, run the command `git clone LINK_TO_FORKED_REPO` in your terminal.

4. To open the repo on your local machine, `cd` into it and run `code .` (this opens VS Code, but you can use your own code editor)

5. In the root directory, run the command `npm run install` to install all of the app's dependencies.

## Setup
1. Create a `config.js` file using the provided `config.example.js` file with your postgreSQL credentials.

2. Navigate to the `schema.sql` file and **replace the file paths on line 55-58** with YOUR OWN FILE PATHS to the data that you downloaded.

3. Run `npm run start` to run this project.

4. Run `npm run createdb` in a seperate terminal window. This will create the database and tables for you in postgreSQL.

## Testing
1. To test the load of the 'GET' requests, run `npm run test-load` in the terminal.

2. To test the functionalities of the 'PUT' and 'POST' requests, run `npm run test-func` in the terminal.
