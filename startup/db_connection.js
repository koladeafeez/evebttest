const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT,
    multipleStatements: true
});

connection.connect((err) => {
    if (err){
        return console.log(err.message);
    }
    console.log("Connected to MySQL");
});