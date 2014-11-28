/**
 * 公共方法
 */

// 载入模块
var Segment = require('segment').Segment;
// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();
//segment.use('URLTokenizer');  // 载入识别模块，详见lib/module目录，或者是自定义模块的绝对路径
//segment.loadDict('dict.txt'); // 载入字典，详见dicts目录，或者是自定义字典文件的绝对路径

//分词处理
exports.sep = function(){
   return function (req, res, next){
       var query = decodeURI(req.query.keyword);
       var queryWords  = req.queryWords = [];

       //搜索分词
       (segment.doSegment(query)).forEach(function(word){
           queryWords.push(word.w);
       });

       console.log(queryWords);
       return next();
   }
};



