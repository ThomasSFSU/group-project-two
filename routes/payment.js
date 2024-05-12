const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database/Database');
const PORT = process.env.port || 3000;


require('dotenv').config(); // Configure environemnt variable which stores API key.
const API_KEY = process.env.API_KEY;
const stripe = require('stripe')(API_KEY);
const DOMAIN = `http://localhost:${PORT}`;


router.get('/', async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    const user_id = req.session.userId;
    if (isLoggedIn) {
        const cartItems = await db.getCartItems(user_id);
        let productsInCart = [];
        for (const item of cartItems){
            let productInfo = await db.getProductByID(item.product_id);
            productInfo.quantity = item.product_quantity;
            productsInCart.push(productInfo);
        };

        // Create a data object to be passed to the template
        const data = {
            username: req.session.username,
            productsInCart: productsInCart,
            user_id: user_id
        };
        res.render(path.join(__dirname, '..', 'views', 'pages', 'payment.ejs'), data);
    } else {
        res.redirect('/login');
    }
});
// MORE STRIPE STUFF. EVENTUALLY MAKE THIS A SEPERATE ROUTER
router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1PFNzPHG3I7WJJZ7XAAwpgsW',
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  
    res.send({clientSecret: session.client_secret});
});

router.get('/session-status', async (req, res) => {
    const sessionId = req.query.session_id;
    console.log('session id: ', sessionId);
    console.log(sessionId);
    try{
      const session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (error){
      if(error){
        console.error("Error:", error.message);
        return;
      }
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
  
    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  });

module.exports = router;