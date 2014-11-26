var express = require('express');
var router = express.Router();

//var models = require('../models');

//首页
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//搜索
router.all('/search', function(req, res, next){
  var body = req.body;
  var word = req.body.content;
  console.log(body);
  return res.redirect('back');
  //使用分词技术，从数据库中查找并返回
  //var question = new models.Question();
  //question.find({},function(error,questions){
  //  if(error){
  //    return next(error);
  //  }

    //返回JSON数据
    //return res.send(questions);
  //});
});

//router.get('/product', function(req, res, next){
//
//});
//
//
//router.get('/effect', function(req, res, next){
//
//});

//发布问题
router.post('/faq', function(req, res, next){
  var body = req.body;
  var content = body.content;
  var date     = new Date();
  console.log(body);
  //var question = new models.Question();

  //question.save({
  //  content:content,
  //  date: date
  //},function(error){
  //  if(error){
  //    return next(error);
  //  }

    //问题发布完成
    return res.redirect('back');
  //});
});

//问题留言
router.post('/comment', function(req, res, next){
  var body = req.body;
  //需要获取问题编号，留言内容
  var id = body.id;
  var content = body.content;

  console.log(body);
  //var comment = new models.Comment();
  //comment.save({
  //  id:id,
  //  content:content,
  //  date: new Date
  //},function(error){
  //  if(error){
  //    return next(error);
  //  }
    //提交完成（此处可以选择ajax提交）
    return res.redirect('back');
  //});
});


//关于我们
router.get('/about', function(req, res){
  res.render('about');
});


//意见反馈
router.all('/feedback',function(req, res){
  if(req.method.toLowerCase() === 'get'){
    //反馈表单
    return res.render('feedback');
  }else {
    var body = req.body;
    //反馈内容
    console.log(body);
    //需要对客户端输入进行处理（安全考虑）
    //var email = body.email;
    //var content = body.content;
    //var date   = new Date();

    //实例化FeedBack
    //var feedback = new models.FeedBack();
    ////存储反馈信息
    //feedback.save({
    //   email:email,
    //   content: content,
    //   date: date
    //},function(error){
    //  if(error){
    //    return next(error);
    //  }
    //  //反馈完成
      return res.redirect('back');
    //});
  }
});

module.exports = router;
