const express = require('express');
const router = express.Router();
const path = require('path');
const database = require('../database/Database');

router.get('/', async (req, res) => {
    // Check login status
    const isLoggedIn = req.session.isLoggedIn;
    //const username = req.session.username;
    if (isLoggedIn) {
        const user_id = req.session.userId;
        const hasProfile = await database.profileExists(user_id);
        req.session.profileExists = hasProfile;
        const data = {username: req.session.username};
        console.log("Logged in Username in dashboard.js: ", data);
        //Conditional logic to render the customizer when first loging into account.
        console.log("hasProfile is: ", hasProfile);

        if(req.session.profileExists){
            const profile = await database.getProfile(user_id);
            console.log("Profile: ", profile);
            req.session.email = data.email;
            req.session.pfp_url = data.profile_img_path;
            data.profile = profile;
            res.render(path.join(__dirname, '..', 'views', 'pages', 'dashboard.ejs'), data);
        } else {
            res.redirect('/profile');
        }
    } else {
        res.redirect('/login');
    }
});

module.exports = router;