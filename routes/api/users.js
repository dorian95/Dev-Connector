/**
 * Routes for Posts
 * Returns json
 * */
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// user model
const User = require('../../models/User');

// @route  POST api/users (api/users - endpoint)
// @desc   Register user -send data to this route (name, email, password)
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password >= 6 char-s').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if the user exists
      let user = await User.findOne({ email }); //search by email

      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      // Get user's gravatar

      // Encrypt password

      // Return jsonwebtoken

      res.send('User route');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
