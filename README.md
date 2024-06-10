## Installation Instructions

- Git clone the repo to get it locally
- Run `npm install` to get install dependencies
- In MySQL, create database CREATE DATABASE <DB_NAME>
- Set up .env file, include:

  ```js
  PORT=8080
  DB_HOST=127.0.0.1
  DB_NAME=<YOUR_DB_NAME>
  DB_USER=<YOUR_DB_USER>
  DB_PASSWORD=<YOUR_DB_PASSWORD>
  SECRET_KEY=""
  ```

- To generate a secret key you can run this line of code in the Terminal: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"`
- Run `npm run dev` to start the app
- With these configs the server URL will be `http://localhost:8080`
- Migrations and seeds are included, to run them:

  - npm run migrate
  - npm run seed

- Data shpuld be populated in the database and can be accessed using the corresponding method for the endpoint using Postman.
