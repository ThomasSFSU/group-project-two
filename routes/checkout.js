const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database/Database')

router.get('/', async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    const user_id = req.session.userId;
    if (isLoggedIn) {
        const cartItems = await db.getCartItems(user_id);
        let productsInCart = [];
        for (const item of cartItems){
            let productInfo = await db.getProductByID(item.product_id);
            productsInCart.push(productInfo);
        };
        //console.log("products in CART: ", productsInCart);

        // Create a data object to be passed to the template
        const data = {
            username: req.session.username,
            productsInCart: productsInCart,
            user_id: user_id
        };
        res.render(path.join(__dirname, '..', 'views', 'pages', 'checkout.ejs'), data);
    } else {
        res.redirect('/login');
    }
});

module.exports = router;