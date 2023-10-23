const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const usermodel = require('');
const isLoggedIn = true;
router.get('/', (req, res) => {
  res.render('home', { isLoggedIn: isLoggedIn });
});



module.exports = router;
