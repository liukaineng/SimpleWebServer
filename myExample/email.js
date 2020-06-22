/**
 * 邮件发送的参考样例
 * 
 * 需要在package.json中添加  "nodemailer": "^6.3.1"
 */
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
          host: "smtp.qq.com", // 主机
          secure: true, // 使用 SSL
          secureConnection: true,
          port: 465, // SMTP 端口
          secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
          auth: {
                    user: '1422920853@qq.com',
                    pass: 'aijnkecmzaeojfbi'  //这里不是邮箱的登录密码，而是秘钥
          },
});

//发送
var send= function (mailOptions) {
          transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                              console.log(error);
                    }
                   // console.log('Message sent: ' + info.response);
          });
}


module.exports={
          send:send ,
}