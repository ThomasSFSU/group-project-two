const database = require('../database/Database');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    let user = req.body.username;
    let pwd = req.body.password;

    if (!user || !pwd) return res.status(400).json({'message': 'username and password are required.'});
    // Check for if user exists
    const sqlCommand = `SELECT * FROM users WHERE username = '${user}'`;
    database.db.all(sqlCommand, async (error, rows) => {
        if(error) {
            throw new Error(error.message);
        }
        if(rows.length > 0){
            // The username was found in database
            req.session.username = rows[0].username;
            console.log("row in user db: ", rows[0]);
            console.log("session: ", req.session);

            console.log("FOUND USERNAME MATCH: ", rows, "USERNAME: ", rows[0].username);
            const hashedPassFromDB = rows[0].password;

            // check that password matches
            const password = await bcrypt.hash(pwd, 10);
            console.log("password: ", password, "hashed pass: ", hashedPassFromDB);
            const isCorrect = await bcrypt.compare(pwd, hashedPassFromDB);
            console.log("is correct is: ", isCorrect);
            if(isCorrect){
                req.session.isLoggedIn = true;
                req.session.username = user;
                req.session.userId = rows[0].ID;
                res.redirect('/dashboard');
            } else {
                console.log("password does not match");
                res.redirect('/dashboard');
            }
        } else {
            // user not found
            console.log("not found");
            return res.redirect('/login'); // Unauthorized error code and redirects to dashboard if user doesn't exist
            //Unauthorized .. FIXME: Change this to a client side warning in future.
        }
    });
}

module.exports = { handleLogin };