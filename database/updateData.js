const db = require("./db.js");

function updateRow() {
  const [id, username] = process.argv.slice(2);
  db.run(
    `UPDATE users SET username = ? WHERE id = ?`,
    [username, id],
    function (error) {
      if (error) {
        return console.error(error.message);
      }
      console.log(`Row ${id} has been updated`);
    }
  );
}

updateRow();