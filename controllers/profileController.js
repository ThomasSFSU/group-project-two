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
    if( await database.profileExists(user_id)){
        database.updateProfileEmail(user_id, email);
        database.updateProfilePicture(user_id, `profile-images/profile${profile_image_number}.jpg`);
        console.log("Updated profile email and image.");
    } else {
        database.addProfile(user_id, `profile-images/profile${profile_image_number}.jpg`, email);
        console.log("Added profile.");
    }

    req.session.email = email;
    req.session.pfp_url = `profile-images/profile${profile_image_number}.jpg`;
    req.session.profileExists = true;
    res.redirect('/dashboard');
}

module.exports = { profileUpdate };