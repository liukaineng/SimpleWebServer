const express = require('express'),
request = require('request'),
bodyParser = require('body-parser'),
fs=require('fs'),
path=require("path");

//使用express搭建服务器
var app= express();
//设置模板引擎为ejs
app.set('view engine','ejs');
//设置引擎模板的路径，默认为同级目录的views
app.set('views', path.join(__dirname, '/dynamicViews/views'));
// bodyParser.urlencoded解析form表单提交的数据
app.use(bodyParser.urlencoded({extended: false})); 
// bodyParser.json解析json数据格式的
app.use(bodyParser.json());

//获取静态页面
app.use(express.static(path.join(__dirname, '/assets')));


//通过ejs模板获取动态页面
var css = fs.readFileSync('./dynamicViews/data/style.css', 'utf8');//动态数据
var data={
  name : 'webarn',
  sex : '男',
  content : '参数,可以更改',
  css:css,
};
app.get('/dynamicView',function (req, res) {
    res.render('index',data)
});




//响应get请求
app.get("/get", function (req, res){
    console.dir(req.query);
    res.send(req.query);
});

//响应post请求
app.post('/post',function (req, res){
    console.dir(req.body);
   res.send(req.body);
});



//发送get请求
function request_get()
{
    request('http://localhost:1234/get?get=get', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) ;
        }
      });
}
//发送post请求，数据格式application/json
function request_post_json()
{
    request({
        url: "http://localhost:1234/post",
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: { "post": 'json' }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.dir(body);
        }
    }); 
}
//发送post请求，数据格式application/x-www-form-urlencoded
function request_post_xForm() {
    request.post(
        {
            url: 'http://localhost:1234/post',
            rejectUnauthorized: false,
            form: { post: 'xForm' }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.dir(body);
            }
        })
}





//监听80端口
app.listen(80, function () {
    console.info("web server start ,port:" + 80);
});
