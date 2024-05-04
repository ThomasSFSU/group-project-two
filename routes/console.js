const express = require('express');
const router = express.Router();
const path = require('path');
const dbController = require('../controllers/dbController');

router.get('/', (req, res) => {
    // Check login status
    const isLoggedIn = req.session.isLoggedIn;
    const username = req.session.username;
    if (isLoggedIn && username === "ADMIN") {
        const data = {username: req.session.username}
        console.log("Logged in Username in console.js: ", data.username);

        res.render(path.join(__dirname, '..', 'views', 'pages', 'console.ejs'), data);
    } else {
        res.redirect('/login');
    }
});
router.post('/add_product', dbController.addProduct);

module.exports = router;