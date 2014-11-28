/*
 * 数据模型
 */

//导入mongoose
var mongoose = require('mongoose');
var config   = require('./config');
var mongodbConfig = config.mongodb;

//连接mongodb数据库
//mongoose.connect('mongodb://localhost/my_database');  //全局

mongoose.connect('mongodb://'+ mongodbConfig.user+':'+mongodbConfig.pass+'@'+mongodbConfig.host+':'+mongodbConfig.port +'/'+mongodbConfig.database+'/'+mongodbConfig.collection);   //身份认证

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

//定义数据模型

// Question
// @param
var Question = new Schema({
    author    : ObjectId
    , title     : { type: String, min: 1 }                   //不得为空
    , body      : { type: String, min: 1 }                   //不得为空
    , date      : { type: Date,   default: Date.now() }
});

exports.QuestionModel = mongoose.model('Question');


// FeedBack
// @param  反馈信息
var FeedBack = new Schema({
      author    : ObjectId
    , title     : { type: String, min: 1 }
    , body      : { type: String, min: 1 }
    , date      : { type: Date,   default: Date.now() }
});

exports.FeedBackModel = mongoose.model('FeedBack');

// Comment
// @param  评论
var Comment = new Schema({
      author    : ObjectId
    , faq       : { type: Number, min: 1 }
    , body      : { type: String, min: 1 }
    , date      : { type: Date,   default: Date.now() }
});

exports.CommentModel = mongoose.model('Comment');

// Faq
// @param 方案
var FAQ = new Schema({
      author    : ObjectId
    , title     : { type: String, min: 1 }
    , body      : { type: String, min: 1 }
    , date      : { type: Date,   default: Date.now() }
});

exports.FAQModel = mongoose.model('FAQ');


// Admin
// @param 管理员
var Admin = new Schema({

});
exports.AdminModel = mongoose.model('Admin');


// API
// @param 接口

var API = new Schema({

});

exports.APIModel = mongoose.model('API');