const database = require('../database/Database');
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    let user = req.body.username;
    let pwd = req.body.password;
    console.log(`Attempting to create: ${user} with password ${pwd}`);
    if (!user || !pwd) return res.status(400).json({'message': 'username and password are required.'});
    // Check for duplicate usernames
    const sqlCommand = 'SELECT * FROM users WHERE username = ?';
    database.db.all(sqlCommand, user, async (error, rows) => {
        if(error) {
            throw new Error(error.message);
        }
        if(rows.length > 0){
            // The username was found in database
            res.redirect('/login');
            // return res.status(409).json({'message': 'username already exists.'}); //Conflict status code
        } else {
            // Continue with sign up, as this is a new user, not found in duplicate check above.
            try {
                //Encrypt password
                const password = await bcrypt.hash(pwd, 10);
                database.insertUser(user, password);
                req.session.isLoggedIn = false;
                req.session.username = user;
                res.redirect('/dashboard');
            } catch (err){
                res.status(500).json({'message': err.message}); //internal server error
            }
        }
    });
}

module.exports = { handleNewUser };
