/**
 * Routes for Posts
 * Returns json
 * */

// bringing Express router
const express = require('express');
const router = express.Router();

// @route  GET api/users (api/posts - endpoint)
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
