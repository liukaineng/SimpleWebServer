const express = require('express'),
bodyParser = require('body-parser'),
fs=require('fs'),
path=require("path");
var mywebsocket=require('./myUtils/myWebsocket');

//使用express搭建服务器
var app= express();
//设置模板引擎为ejs
app.set('view engine','ejs');
//设置引擎模板的路径，默认为同级目录的views
app.set('views', path.join(__dirname, '/view'));
// bodyParser.urlencoded解析form表单提交的数据
app.use(bodyParser.urlencoded({extended: false})); 
// bodyParser.json解析json数据格式的
app.use(bodyParser.json());

//获取静态页面
app.use(express.static(path.join(__dirname, '/assets')));




//响应get请求(返回一个动态页面)
app.get("/get", function (req, res){
    var data=req.query;
    console.dir(data);
    //通过ejs模板获取动态页面
    res.render('index',data)
});

//响应post请求
app.post('/post',function (req, res){
    console.dir(req.body);
   res.send(req.body);
});

//监听80端口
app.listen(80, function () {
    console.info("web server start ,port:" + 80);
});


//websocket
mywebsocket.listen(1180);

