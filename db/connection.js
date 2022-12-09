const mysql = require("mysql2");

// Connect to database. Note: this password was created just for this project. Trust me, my identity is not worth stealing
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Aster1sk!',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

module.exports = connection;