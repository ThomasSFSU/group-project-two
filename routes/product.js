const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database/Database');


router.get('/', async (req, res) => {
    let productId = req.query.id;
    console.log("Rendering product id: ", productId);
    let product = await db.getProductByID(productId);
    // formulate a query to retrieve relevant product
    if(product){
        console.log("product: ", product);
        const data = {'product': product, 'userId': req.session.userId};
        console.log("Sending data to product page: ", data);
        res.render(path.join(__dirname, '..', 'views', 'pages', 'product.ejs'), data);
    } else {
        console.log("The number requested is not a valid product!");
        res.redirect('/catalog');
    }
});

module.exports = router;