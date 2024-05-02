const db = require("./db.js");

function insertRow(username, password) {
  db.run(
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

module.exports = insertRow;