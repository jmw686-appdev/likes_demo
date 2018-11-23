const express = require('express');
const router = express.Router();
require('../passport');
const connect = require('connect-ensure-login');
const passport = require('passport');
const User = require('../models/user');
/* GET home page. */
router.get('/', connect.ensureLoggedIn('/users/login'), function(req, res, next) {

  res.render('index', { title: 'Tumblr Likes Demo' });
});

router.get('/tumblr_callback', connect.ensureLoggedIn('/users/login'), function(req, res, next) {

  res.end(JSON.stringify(req.query, null, 2));
});


module.exports = router;
