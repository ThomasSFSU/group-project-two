const database = require('../database/Database');

const profileUpdate = async (req, res) => {
    let email = req.body.email;
    let profile_image_number = req.body.profile_image_number;

    if (!user || !pwd){
        return res.redirect('/dashboard');
    }
    const user_id = req.session.userId;
    database.addProfile(user_id, email, `profile-images/profile${profile_image_number}.jpg`);
    req.session.profileExists = true;
    console.log("Added profile.");
    res.redirect('/dashboard');
}

module.exports = { profileUpdate };