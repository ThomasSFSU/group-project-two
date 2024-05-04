const database = require('../database/Database');


const addProduct = async (req, res) => {
    const name = req.body.product_name;
    const description = req.body.product_description;
    const price = req.body.product_price;
    const url = req.body.product_img;
    console.log("body: ", req.body);
    console.log("name: ", name);
    console.log("description: ", description);
    console.log("price: ", price);
    console.log("img url: ", url);
    database.insertProduct(name, description, price, url);
}

module.exports = {addProduct};