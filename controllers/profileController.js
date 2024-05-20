const database = require('../database/Database');

const profileUpdate = async (req, res) => {
    if(!req.session.isLoggedIn){
        console.log("Session must be logged in");
        return res.redirect('/dashboard');
    }
    let email = req.body.email;
    let profile_image_number = req.body.profile_image_number;

    console.log("EMAIL: ", email);
    console.log("PFP IMAGE NUMBER: ", profile_image_number);

    const user_id = req.session.userId;
    database.addProfile(user_id, `profile-images/profile${profile_image_number}.jpg`, email);
    req.session.email = email;
    req.session.pfp_url = `profile-images/profile${profile_image_number}.jpg`;
    req.session.profileExists = true;
    console.log("Added profile.");
    res.redirect('/dashboard');
}

module.exports = { profileUpdate };