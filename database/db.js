const sqlite3 = require("sqlite3").verbose();
const filepath = "users.db";
const fs = require("fs");

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        console.log("Connection with SQLite has been established.", filepath, " already exists.");
        return new sqlite3.Database(filepath);
    } else {
        const db = new sqlite3.Database(filepath, (error) => {
            if (error) {
              return console.error(error.message);
            }
            createTable(db);
          });
          console.log("Connection with SQLite has been established");
          return db;
    }
}
function createTable(db) {
    db.exec(`
    CREATE TABLE users
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      username   VARCHAR(50) NOT NULL,
      password   VARCHAR(50) NOT NULL
    );
  `);
  }

module.exports = createDbConnection();