const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database/Database');


router.get('/', async (req, res) => {
    let productId = req.query.product_id;
    let userId = req.session.userId;
    // If user is not logged in, redirect to login page
    if(!userId){
        console.log("Must be signed in to add items to cart.");
        res.redirect('/login');
    } else { //If a user is logged in
        if( await db.itemIsInCart(userId, productId)){
            //UPDATE QUANTITY OF ITEM
            console.log("THIS SHOULDNT BE TRIGGERED FOR NEW ITEM");
            db.incrementItemQuantity(userId, productId);
        } else{
            // ITEM NOT IN CART SO ADD IT
            console.log("Adding to cart product id: ", productId);
            console.log("Adding to cart user id: ", userId);
            db.insertCartItem(userId, productId, 1);
            console.log("Cart Row added!");
        }
        //console.log("SHOWING CART FOR", req.session.username, ": ", await db.getCartItems(userId));
    }
});

router.get('/delete', (req, res) => {
    let productId = req.query.product_id;
    let userId = req.session.userId;
    console.log('received a request to delete route');
    console.log("user id", userId);
    console.log('product_id', productId);
    db.deleteCartItem(userId, productId);
    console.log('item deleted');
    res.redirect('/checkout');
});
router.get('/decrement', (req, res) => {
    let productId = req.query.product_id;
    let userId = req.session.userId;
    console.log('received a request to decrement route');
    console.log("user id", userId);
    console.log('product_id', productId);
    db.decrementCartItem(userId, productId);
    console.log('item decremented');
    res.redirect('/checkout');
});
router.get('/increment', (req, res) => {
    let productId = req.query.product_id;
    let userId = req.session.userId;
    console.log('received a request to decrement route');
    console.log("user id", userId);
    console.log('product_id', productId);
    db.incrementItemQuantity(userId, productId);
    console.log('item incremented');
    res.redirect('/checkout');
})

module.exports = router;