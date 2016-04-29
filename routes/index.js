'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var Account = require('../models/account');

router.get('/', (req, res) => {
  var indexPath = path.join(__dirname, '../views/index.html');
  res.sendFile(indexPath);
});

module.exports = router;
