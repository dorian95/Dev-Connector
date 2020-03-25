// Routes for users
// bringing Express router
const express = require('express');
const router = express.Router();

// @route  GET api/users (api/users - endpoint)
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('User route'));

module.exports = router;
