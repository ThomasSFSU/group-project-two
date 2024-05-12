const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents.js');
const PORT = process.env.port || 3000;

// Payment processing
require('dotenv').config(); // Configure environemnt variable which stores API key.
const API_KEY = process.env.API_KEY;
const stripe = require('stripe')(API_KEY);
const DOMAIN = `http://localhost:${PORT}`;

// MORE STRIPE STUFF. EVENTUALLY MAKE THIS A SEPERATE ROUTER
app.post('/create-checkout-session', async (req, res) => {
  // Change this after it is working
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
app.get('/session-status', async (req, res) => {
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
// END OF STRIPE STUFF IN SERVER.JS

// Custom routers
const rootRouter = require('./routes/root.js');

// Custom middleware logger
app.use(logger);

// Use built in middleware for url encoded (form) data
app.use(express.urlencoded({extended: false}));

// Use other built in middleware to handle json data submission
app.use(express.json());

// Serve static files -- CSS, etc
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
const session = require('express-session');
app.use(
  session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true
  })
);

// Use EJS
app.set('view engine', 'ejs');

//routes
app.use(rootRouter);
app.use('/return', require('./routes/return.js'))
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login.js'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/console', require('./routes/console'));
app.use('/catalog', require('./routes/catalog.js'));
app.use('/product', require('./routes/product'));
app.use('/cart', require('./routes/cart'));
app.use('/logout', require('./routes/logout.js'));
app.use('/checkout', require('./routes/checkout'));

// Default route if other none of above routes match
app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})