const mysql = require("mysql");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "946763149",
    database:"social"
});

module.exports = db;