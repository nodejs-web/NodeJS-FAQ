var express = require('express');
var moment = require('moment');
var router = express.Router();
var func   = require('../lib/function');
require('date-utils'); //时间处理

var models      = require('../lib/model');
var FeedBack    = models.FeedBackModel;
var Comment     = models.CommentModel;
var Question    = models.QuestionModel;
var FAQ         = models.FAQModel;

//首页
router.get('/', function(req, res) {
  return res.render('index');
});

//跳转question 页面
router.get('/questions', function(req, res, next){
  queList(function(error, questions){
    if(error){
      return next(error);
    }

    console.log(questions);
    return res.render('questions', {
      questions: questions
    });
  });
});

//搜索
router.get('/search', func.sep(), function(req, res, next){
   //原条件
   var query = req.query.keyword;
   //分词列表
   var words = req.queryWords;
  //后期可考虑使用爬虫
  queQue(words, function(error, data){
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
        ques: data,
        keyword:query
      });
    }
  });
});

//查看详情
router.get('/view/*',function(req, res, next){
   var id = req.params['0'];
   queDet(id, function(error, data){
      if(error){
        return next(error);
      }

      return res.render('detail', {
          data : data
      });
   });
});

//发布问题
router.all('/faq', function(req, res, next){
  if(req.method.toLowerCase() === 'get'){
    res.render('faq');
  }else{
    var body = req.body;
    //数据处理
    addFaq(body, function(error,result){
      if(error){
        return next(error);
      }
      console.log(result);
      //问题发布完成
      return res.redirect('back');
    });
  }
});

//问题留言
router.post('/comment', function(req, res, next){
  var body = req.body;
  //需要获取问题编号，留言内容
  addCom(body, function(error, result){
    if(error){
      return next(error);
    }

    console.log(result);
    return res.redirect('back');
  });
});

//意见反馈
router.all('/feedback',function(req, res, next){
  if(req.method.toLowerCase() === 'get'){
    //反馈表单
    return res.render('feedback');
  }else {
    var body = req.body;
    console.log(body);
    //反馈内容
    addFeed(body, function(error, result){
      if(error){
        return next(error);
      }

      return res.redirect('back');
    });
  }
});

function queList(callback){
  //
  FAQ.find({},function(error, data){
    if(error){
      return callback(error);
    }

    data.forEach(function(item){
      //var d = new Date(item.date);
      item.date = item.time = (item.date).toFormat("YYYY-MM-DD HH24:MM:SS");
    });
    return callback(null, data);
  });
}

//搜索问题
function queQue(keyword, callback){
  //建立查询条件
  FAQ.find({title :keyword, body: keyword },function(error, data){
    if(error){
      return callback(error);
    }
    data.forEach(function(item){
      //var d = new Date(item.date);
      console.log(item.date);
      item.date = item.time = (item.date).toFormat("YYYY-MM-DD HH24:MM:SS");
    });
    //返回查询结果
    return callback(null, data);
  });
}

//查看具体问题
function queDet(id, callback){
  FAQ.findOne({_id :id}, function(error, data){
    if(error){
      return callback(error);
    }
    //console.log(data.date);
    //var d = new Date(data.date);
    console.log(data.date);
    data.date = data.time = (data.date).toFormat("YYYY-MM-DD HH24:MM:SS");
    //data.time =  moment(data.date).format("YYYY-MM-DD HH:mm:ss");
    return callback(null, data);
  });
}

//添加问题
function addFaq(data,callback){
  var faq   = new FAQ();
  faq.body  = data.description;
  faq.title = data.title;
  faq.date   = Date.now();
  faq.save(function(error, data){
    if(error){
      return callback(error);
    }
    return callback(null, data);
  });
}


//添加反馈
function addFeed(data, callback){
  var feed = new FeedBack();
  feed.email  = data.email;
  feed.body   = data.feedback;
  feed.date   = Date.now();
  feed.save(function(error, data){
    if(error){
      return callback(error);
    }

    return callback(null, data);
  });
}

//添加评论
function addCom(data, callback){
  var com = new Comment();
  com.faq = data.id;
  com.body = data.content;
  com.date   = Date.now();
  com.save(data, function(error, data){
    if(error){
      return callback(error);
    }
    return callback(null, data);
  });
}

function format(time){

  time = time.getTime();  // + 8*60*60*1000;  如果少了8小时 就加上这个时间
  return  moment(time).format("YYYY-MM-DD HH:mm:ss");
}

module.exports = router;
