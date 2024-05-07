const express = require('express');
const router = express.Router();
const path = require('path');


router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views','index.html'));
  });
router.get('^/$|/catalog(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views','catalog.html'));
});
router.get('/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
  })
  router.get('/signup(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
  })
router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/index.html') // Sets 301 status code, default is 302.
  })

  module.exports = router;