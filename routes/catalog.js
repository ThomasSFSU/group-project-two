const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database/Database');


router.get('/', (req, res) => {
    // formulate a query to retrieve relevant products from the db
    let productsTable = db.getProducts();
    console.log(productsTable);

    //res.render(path.join(__dirname, '..', 'views', 'pages', 'catalog.ejs'), data);

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