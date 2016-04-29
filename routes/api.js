/**
 * Created by Admin on 4/28/16.
 */
'use strict';

var express = require('express');
var router = express.Router();

router.use('/account', require('./account'));

module.exports = router;