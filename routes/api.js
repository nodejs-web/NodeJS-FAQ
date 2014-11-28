/**
 *  API 接口.
 */

var express = require('express');
var router = express.Router();

var models = require('../models');

//首页
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});


module.exports = router;
