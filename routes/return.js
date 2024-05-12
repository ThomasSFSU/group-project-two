const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    console.log("got a request to route return.html ");
    
    res.sendFile(path.join(__dirname, '..', 'views', 'pages', 'return.html'));
  });

module.exports = router;
