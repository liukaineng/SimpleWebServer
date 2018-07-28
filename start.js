const express = require('express'),
request = require('request'),
bodyParser = require('body-parser'),
path=require("path");

var app= express();
// bodyParser.urlencoded解析form表单提交的数据
app.use(bodyParser.urlencoded({extended: false})); 
// bodyParser.json解析json数据格式的
app.use(bodyParser.json());

//获取静态资源的
app.use(express.static(path.join(__dirname, '/assets')));



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