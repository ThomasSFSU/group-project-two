const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    // Check login status
    const isLoggedIn = req.session.isLoggedIn;
    //const username = req.session.username;
    if (isLoggedIn) {
        const data = {username: req.session.username}
        console.log("Logged in Username in dashboard.js: ", data);

        res.render(path.join(__dirname, '..', 'views', 'pages', 'dashboard.ejs'), data);
        //res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html')); // Taken out because o
    } else {
        res.redirect('/login');
    }
});

module.exports = router;