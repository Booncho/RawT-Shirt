const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const usermodel = require('../configs/usermodel');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Incorrect password');
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    req.session.user_id = user._id.toString();
    req.session.user_username = user.username.toString();
    req.session.user_email = user.email.toString();
    req.session.userloggin = true;
    res.redirect('/');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
