# city-events-api

<h3> Installation guides </h3>

1. run `npm install` to install dependencies.<br>

2. create a `.env` file and add values for the following fields according to your environment <br>
    `NODE_ENV=development` <br>
    `PORT=5000` <br>
    `JWT_SECRET=`

    `DB_USERNAME=root` <br>
    `DB_PASSWORD=` <br>
    `DB_NAME=city_events` <br>
    `DB_PORT=3306` <br>
    `DB_HOST=127.0.0.1` <br>

    `MAIL_HOST=` <br>
    `MAIL_PORT=587` <br>
    `MAIL_USERNAME=` <br>
    `MAIL_PASSWORD=` <br>
    `MAIL_ENCRYPTION=ssl` <br>
    `MAIL_FROM_ADDRESS=` <br>
    `MAIL_FROM_NAME="City Events"` <br>

3. create a database on your MySQL and name it `city_events` <br>

4. run `npm run migrate` <br>

5. Start your MySQL database.

6. Create an `uploads` folder in the App's root directory

7. run `nodemon` or `npm start` to serve with hot reload at `localhost:5000`
