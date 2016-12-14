// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/user';
//
// var insertData = function(db, callback) {
//     //连接到表
//     var collection = db.collection('signup');
//     //插入数据
//     var data = [{"name":'wilson001',"age":21},{"name":'wilson002',"age":22}];
//     collection.insert(data, function(err, result) {
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         }
//         callback(result);
//     });
// }
//
// MongoClient.connect(DB_CONN_STR, function(err, db) {
//     console.log("连接成功！");
//     insertData(db, function(result) {
//         console.log(result);
//         db.close();
//     });
// });


// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/user';


var mongoose = require("mongoose");  //  顶会议用户组件
var db = mongoose.createConnection('mongodb://localhost/user');
var Schema = mongoose.Schema;    //  创建模型
var userScheMa = new Schema({
    username: String,
    id: String
}); //  定义了一个新的模型，但是此模式还未和users集合有关联
var user = mongoose.model('signup', userScheMa); //  与users集合关联
var doc = {username : 'xxxxxx', id : '11111111'};
var test = new user(doc);
test.save();


// var query_doc = {"id":"15331329"};
// 	user.count(query_doc, function(err, doc){
// 		if(doc == 1){
// 			console.log(query_doc.username + ": login success in " + new Date());
//
// 		}else{
// 			console.log(query_doc.username + " failed " + new Date());
// 		}
// 	});
// //
// var selectData = function(db, callback) {
//   //连接到表
//   var collection = db.collection('signup');
//   //查询数据
//   var whereStr = {"id":'153322221329'};
//   collection.find(whereStr).toArray(function(err, result) {
//     if(err)
//     {
//       console.log('Error:'+ err);
//       return;
//     }
//     callback(result);
//   });
// }
//
// MongoClient.connect(DB_CONN_STR, function(err, db) {
//   console.log("连接成功！");
//   selectData(db, function(result) {
// 	if (result.toString() == "[]")
// 	console.log("fail to find it ");
// 	else
//     console.log(result);
//     db.close();
//   });
// });
