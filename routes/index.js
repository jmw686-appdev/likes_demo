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
  let current_user = req.user;
  let access_token = req.query.access_token;
  let access_secret = req.query.access_secret;
  User.findOneAndUpdate({_id: current_user.id }, {$set: {access_token: access_token, access_secret: access_secret}}, {new: true}, (error, doc) => {
    // error: any errors that occurred
    // doc: the document before updates are applied if `new: false`, or after updates if `new = true`
  });
  // res.end(JSON.stringify(req.query, null, 2));
  res.redirect('/users/likes');
});


module.exports = router;
