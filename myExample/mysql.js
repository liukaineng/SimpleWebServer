/**
 * mysql操作的基础样例
 * 
 * 需要在package.json中添加  "mysql": "^2.17.1"
 * 
 * 注意事项：数据库操作完成之后一定要记得断开连接。
 */

var mysql = require('mysql');

var pool = mysql.createPool(
          {                   
                    host:'120.25.106.4',    //数据库地址
                    prot:'3306',             //数据库端口号
                    user:"arshowbox",             //数据库用户名
                    password:'xxxxxxxxxxxxxxxxx',       //数据库密码
                    database:"arshow",  //数据库名
          }
)



//查询产品类型语句
var findProduct_sql = "SELECT * FROM pixelpicture_type WHERE pixelpicture_type.typeCode=?";
//查询激活码语句
var findActivation_sql = "SELECT * FROM pixelpicture_activation LEFT JOIN  pixelpicture_equipment USING(aid) " +
          "LEFT JOIN  pixelpicture_type USING(typeId) " +
          "LEFT JOIN  pixelpicture_config USING(configId) "+
          "WHERE pixelpicture_activation.activationCode=?"
          ;
//增加设备语句
var addEquipment_sql = 'INSERT INTO pixelpicture_equipment(aid,information,uptime) VALUES(?,?,?)'
//更新激活码表项
var updateActivation_sql="UPDATE pixelpicture_activation SET ycount = ? WHERE aid = ?"
//通过路径查询配置
var getConfig_sql="SELECT * FROM pixelpicture_config WHERE pixelpicture_config.pagePath=?";



//执行一条sql语句
var runSql = function (connection, sql, param, errorCallback, callback) {
          connection.query(sql, param, function (err, result) {
                    if (err) {
                              console.dir(err);
                              //如果sql语句执行遇到错误，默认认为url是合法的
                              if(errorCallback!=null)
                              {
                                        errorCallback({ validUrl: false , errorCode:505,errorMsg:codeMap(505)});
                              }
                              connection.release();//释放连接
                              return;
                    }
                    else {
                            //console.log("query succeed:")
                            //console.dir(result);
                            callback(result);
                    }
          });
}

//体验路径查询配置
var demo = function (path, callback) {
          pool.getConnection(function (err, connection) {
              if (err) {
                  //无法连接到数据库
                  console.log("get database connection failed " + err);
                  callback({ validUrl: false, errorCode: 505, errorMsg: codeMap(505) });
                  return;
              } else {
                  runSql(connection, getConfig_sql, path, callback, function (result) {
      
                      if (result.length > 0) {
                          config = result[0];
                      }
                      config.errorCode = 500;
                      config.errorMsg = codeMap(500)
                      connection.release();//释放连接
                      callback(config);
                  })
              }
          })
      }
      