const database = require('../database/Database');

const addProduct = (name, description, price, url) => {
    database.addProduct(name, description, price, url);
}

module.exports = {addProduct};