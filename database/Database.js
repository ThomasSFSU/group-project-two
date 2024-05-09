const sqlite3 = require("sqlite3").verbose();
const filepath = "database.db";
const fs = require("fs");
const { CLIENT_RENEG_WINDOW } = require("tls");

class Database {
    constructor() {
        this.db = this.connectDB();
    }
    connectDB(){
        if (fs.existsSync(filepath)) {
            console.log("Connection with SQLite has been established.", filepath, " already exists.");
            return new sqlite3.Database(filepath);
        } else {
            this.db = new sqlite3.Database(filepath, (error) => {
                if (error) {
                  return console.error(error.message);
                }
              });
              this.createUserTable();
              this.createProductTable();
              console.log("Connection with SQLite has been established. Tables for users and products have been created.");
              return;
        }
    }
    createUserTable() {
        this.db.exec(`
        CREATE TABLE users
        (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          username   VARCHAR(50) NOT NULL,
          password   VARCHAR(50) NOT NULL
        );
      `);
    }
    createProductTable() {
      //FIXME TEST THIS FUNCTION
      this.db.exec(`
      CREATE TABLE products
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name   VARCHAR(50) NOT NULL,
        product_description   VARCHAR(250) NOT NULL,
        product_price   INTEGER,
        product_image   VARCHAR(250) NOT NULL
      );
    `);
    }
    createCartsTable() {
      this.db.exec(`
      CREATE TABLE carts
      (
        cart_entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id           INTEGER NOT NULL,
        product_quantity  INTEGER NOT NULL,
        product_id        INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (ID),
        FOREIGN KEY (product_id) REFERENCES products (ID)
      );
    `);
    }
    insertUser(username, password) {
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
    insertProduct(name, description, productPrice, imagePath){
      this.db.run(
        `INSERT INTO products (product_name, product_description, product_price, product_image) VALUES (?, ?, ?, ?)`,
        [name, description, productPrice, imagePath],
        function (error) {
          if (error) {
            console.error(error.message);
            throw new Error(error.message);
          }
          console.log(`Inserted a row to products with the ID: ${this.lastID}`);
        });
    }
    insertCartItem(user_id, product_id, product_quantity) {
      // If the proudct is not already in database run the following:
      this.db.run(
        `INSERT INTO carts (user_id, product_quantity, product_id) VALUES (?, ?, ?)`,
        [user_id, product_quantity, product_id],
        function (error) {
          if (error) {
            console.error(error.message);
            throw new Error(error.message);
          }
          console.log(`Inserted a row to cart with the ID: ${this.lastID}`);
        }
      );
    }
    getProducts(){
      let rows = [];
      return new Promise(resolve=>{
        this.db.all('SELECT * FROM products',(error, rows)=>{
            if(error){
                return console.error(error.message);
            }
            resolve(rows);
        });
      });
    }
    getProductByID(id){
      let sql = 'SELECT * FROM products WHERE ID = ?';
      return new Promise(resolve=>{
        this.db.get( sql, [id], (error, row) => {
          if(error){
            console.error(error.message);
            throw new Error(error.message);
          }
          console.log(row);
          resolve(row);
        });
      })
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