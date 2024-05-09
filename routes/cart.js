const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database/Database');


router.get('/', async (req, res) => {
    let productId = req.query.product_id;
    let userId = req.query.user_id;
    
    console.log("Adding to cart product id: ", productId);
    console.log("Adding to cart user id: ", userId);
    let cartRow = await db.insertCartItem(userId, productId, 1);
    console.log("Cart Row added!");
    console.log("cartRow is now currently after much deliberation: ", cartRow);
    // Add the item to cart
    // if(product){
    //     console.log("product: ", product);
    //     const data = {'product': product};
    //     res.render(path.join(__dirname, '..', 'views', 'pages', 'product.ejs'), data);
    // } else {
    //     console.log("The number requested is not a valid product!");
    //     res.redirect('/catalog');
    // }
});

module.exports = router;