const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("logging out: ", req.session.username);
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/index');
      }
    });
  });

module.exports = router;