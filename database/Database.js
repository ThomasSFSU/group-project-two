const sqlite3 = require("sqlite3").verbose();
const filepath = "users.db";
const fs = require("fs");

class Database {
    constructor() {
        this.db = this.connectDB();
    }
    connectDB(){
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
    createTable() {
        this.db.exec(`
        CREATE TABLE users
        (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          username   VARCHAR(50) NOT NULL,
          password   VARCHAR(50) NOT NULL
        );
      `);
      }
    insertRow(username, password) {
        this.db.run(
          `INSERT INTO users (username, password) VALUES (?, ?)`,
          [username, password],
          function (error) {
            if (error) {
              console.error(error.message);
              throw new Error(error.message);
            }
            console.log(`Inserted a row with the ID: ${this.lastID}`);
          }
        );
    }
    static selectRows() {
        this.db.each(`SELECT * FROM users`, (error, row) => {
          if (error) {
            throw new Error(error.message);
          }
          console.log(row);
        });
    }
}
module.exports = new Database();