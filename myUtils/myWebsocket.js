/**
 * 用于广播消息
 */

const ws = require('nodejs-websocket');

var myWebsocket = ws.createServer();

myWebsocket.on('listening', function (res) {
          
          console.log("websocket listen...")
});

myWebsocket.on('connection', function (connection) {
          console.log("有一个新的连接被创建...")
          connection.on('text', function (result) {
                    console.log('发送消息', result)
                    broadcast(result);
          })
          connection.on('connect', function (code) {
                    console.log('开启连接', code)
          })
          connection.on('close', function (code) {
                    console.log('关闭连接', code)
          })
          connection.on('error', function (code) {
                    console.log('异常关闭', code)
          })
});

myWebsocket.on('error', function (errObj) {
          console.log("websocket 发生错误...");
          console.dir(errObj)
});

myWebsocket.on('close', function () {
          console.log("websocket 发生错误...");

});

// 发送广播
function broadcast(msg) {
          myWebsocket.connections.forEach(function (conn) {
                    conn.sendText(msg)
          })
}
module.exports = myWebsocket;