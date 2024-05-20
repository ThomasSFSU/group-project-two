const express = require('express');
const router = express.Router();
const path = require('path');
const profileController = require('../controllers/profileController');

router.get('/', (req, res) => {
    res.render(path.join('..', 'views', 'pages', 'editProfile.ejs'));
});

router.post('/', profileController.profileUpdate);

module.exports = router;