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
  // Get products from cart
  const isLoggedIn = req.session.isLoggedIn;
  if(!isLoggedIn){ res.redirect('/login');};
  const user_id = req.session.userId;
  const cartItems = await db.getCartItems(user_id);
  let productsInCart = [];
  for (const item of cartItems){
      let productInfo = await db.getProductByID(item.product_id);
      productInfo.quantity = item.product_quantity;
      productsInCart.push(productInfo);
  };
  console.log("Products in cart: ", productsInCart);

  const productPrices = [ 'price_1PFNzPHG3I7WJJZ7XAAwpgsW', // product 1
                          'price_1PFSTaHG3I7WJJZ77DwpVDu8', // product 2
                          'price_1PFSVLHG3I7WJJZ7Os2R0ajE', // product 3
                          'price_1PFSWXHG3I7WJJZ7Th3qVExg', // product 4
                          'price_1PFSXMHG3I7WJJZ7mxdOARlo', // product 5
                          'price_1PFSYuHG3I7WJJZ7AuM6iFbH'  // product 6
                        ];

  const items = productsInCart.map((item) => {
     return {
        price: productPrices[item.ID - 1],
        quantity: item.quantity,
      }
  })
  console.log(items);


    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: items,
      mode: 'payment',
      return_url: `${DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: {enabled: true}
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