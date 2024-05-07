const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database/Database');


router.get('/', async (req, res) => {
    // formulate a query to retrieve relevant products from the db
    let productsTable = await db.getProducts();
    const data = { 'products': productsTable};
    let product1 = await db.getProductByID(1);
    if(product1){
        console.log("product1: ", product1);
    } else {
        console.log("The number requested is not a valid product!");
    }

    res.render(path.join(__dirname, '..', 'views', 'pages', 'catalog.ejs'), data);

    // // Check login status
    // const isLoggedIn = req.session.isLoggedIn;
    // //const username = req.session.username;
    // if (isLoggedIn) {
    //     const data = {username: req.session.username}
    //     console.log("Logged in Username in dashboard.js: ", data);

    //     res.render(path.join(__dirname, '..', 'views', 'pages', 'dashboard.ejs'), data);
    // } else {
    //     res.redirect('/login');
    // }
});

module.exports = router;