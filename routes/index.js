var express = require('express');
var router = express.Router();
var path = require('path');
var page = require('./page.js');
var user = require('./users.js');
/*
 * Routes  can be accessed by any one
 */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'public',  'index.html'));
});



router.get('/topActiveUsers', page.getNumber);
router.get('/users', user.getUser);
module.exports = router;
