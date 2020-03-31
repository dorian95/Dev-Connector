/**
 * Routes for Posts
 * Returns json
 * */
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
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
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      // Get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      //creates a new User instance
      user = new User({
        name,
        email,
        avatar,
        password
      });
      // Encrypt password
      // Create a salt for hashing
      const salt = await bcrypt.genSalt(10);
      //creates a hash, puts in user.password
      user.password = await bcrypt.hash(password, salt);

      // Saves User in DB
      //returns a promise, hence use "await"
      await user.save();

      // Return jsonwebtoken
      //create a payload
      const payload = {
        user: {
          id: user.id
        }
      };
      // Sign the token, pass in payload & secret
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, // expiration
        (err, token) => {
          // in callback you get either
          if (err) throw err; // error or
          res.json({ token }); // token
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
