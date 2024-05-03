const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents.js');
const PORT = process.env.port || 3000;

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
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login.js'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/logout', require('./routes/logout.js'));
app.use('/checkout', require('./routes/checkout'));

// Default route if other none of above routes match
app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})