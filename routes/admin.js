/**
 * 后台路由
 */
var express = require('express');
var router = express.Router();
var models = require('../lib/model');
var Admin  = models.AdminModel;

//后台首页
router.get('/', function(req, res) {
    res.render('admin/index', { title: 'Express' });
});

module.exports = router;