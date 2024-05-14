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
        //FIXME -- add conditional logic to only render customizer when first creating account.
        res.render(path.join(__dirname, '..', 'views', 'pages', 'customize_profile.ejs'), data);
    } else {
        res.redirect('/login');
    }
});

module.exports = router;