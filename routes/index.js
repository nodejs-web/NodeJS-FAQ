var express = require('express');
var router = express.Router();

var models      = require('../models');
var FeedBack    = models.FeedBackModel;
var Comment     = models.CommentModel;
var Question    = models.QuestionModel;
var FAQ         = models.FAQModel;

//首页
router.get('/', function(req, res) {
  res.render('index', { title: 'Express'});
});

//搜索
router.get('/search', function(req, res, next){
  //搜索词列表
  var words = decodeURI(req.query.keyword).split(' ');

  console.log(words);
  //使用分词技术

  //从数据库中进行检索

  //将数据反馈

  //后期可考虑使用爬虫
  query(words, function(error, data){
    if(error){
      return next(error);
    }
    //ajax 请求
    if(req.xhr){
      //返回json数据
      return res.send(data, 200);
    }else{
      //渲染页面
      return res.render('questions',{
        ques: data
      });
    }
  })

});

router.get('/questions', function(req, res, next){
  //默认查询
  var keyword = req.query.keyword !== undefined ? req.query.keyword : '';

  //根据keyword查询
  return res.render('questions', {
    keyword: 'Node.js 开发常见问题汇总'
  });
});

//发布问题
router.all('/faq', function(req, res, next){
  if(req.method.toLowerCase() === 'get'){
    res.render('faq');
  }else{
    var body = req.body;
    var title  = body.title;
    var description = body.description;
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
  }
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

//搜索问题
function queQue(keyword, callback){
  var que = new Que();
  //建立查询条件
  que.find({},function(error, data){
    if(error){
      return callback(error);
    }
    //返回查询结果
    return callback(null, data);
  });
}

//查看问题
function queDet(id, callback){
  var det = new Det();
  det.findOne(id, function(error, data){
    if(error){
      return callback(error);
    }

    return callback(null, data);
  });
}

//添加问题
function addFaq(data,callback){
  data = data || {};
  var faq  = new Faq();
  faq.save(data, function(error, data){
    if(error){
      return callback(error);
    }
    return callback(null, data);
  });
}


//添加反馈
function addFeed(data, callback){
  data = data || {};
  var feed = new Feed();
  feed.save(data, function(error, data){
    if(error){
      return callback(error);
    }

    return callback(null, data);
  });
}

//添加评论
function addCom(data, callback){
  data = data || {};
  var com = new Com();
  com.save(data, function(error, data){
    if(error){
      return callback(error);
    }
    return callback(null, data);
  });
}

module.exports = router;
