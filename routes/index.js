const express = require('express');
const router = express.Router();
require('../passport');
const passport = require('passport');
const User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});


module.exports = router;
