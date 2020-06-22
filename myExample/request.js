/**
 * 用来发送http请求参考样例
 * 需要在package.json中添加    "request": "^2.87.0"
 */
var request = require('request');

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