
var jsonArray = [];
var numOfJson = 0;
var errorInfo;
var usernameInRequest;
var fs = require('fs')
var path = require('path');

var express = require('express');
var app = express();

var mongoose=require('mongoose');
var User = require('../model/user')

module.exports.signup = function (req, res) {
	if (req.param("username") == undefined) {
		console.log("initial page");
		res.sendFile(path.resolve('view/index.html'));
	} else {
		var username = req.param("username").toString();
		console.log("find user: " +  username);
		findJson(username, res)
	}

}
module.exports.signin = function(req, res) {
	res.sendFile(path.resolve('view/signin.html'));
}
module.exports.check = function (req, res) {
	console.log("check password");
	var testuser = {
		username:req.body.username,
		password:req.body.password,
		// id:req.body.id,
		// phone:req.body.phone,
		// email:req.body.email
	}
	User.find(testuser, function (err, detail) {
		if (detail.length) {
			var userInDatabase = {
				username:detail[0].username,
				id:detail[0].id,
				phone:detail[0].phone,
				email:detail[0].email
			}
			console.log("user in database :");
			console.log(userInDatabase);
			showInfo(userInDatabase, res);
		} else {
			console.log("wrong!");
			errorInfo = "用户名不存在或密码错误"
			fs.readFile(__dirname+'/../view/signin.html', function (err,data) {
		        if (err) console.err(err);
		        console.log("errorinfo: " + errorInfo);
		        var htmlString = data.toString();
		        htmlString = htmlString.replace(/请输入信息/, errorInfo);
				res.send(htmlString);
		    })
		}
	})
}
module.exports.info = function(req, res) {
	// var resultData = "{";
	// resultData += '"'+ "username" +'"' +':' + '"' + req.body.username + "\",";
	// resultData += '"'+ "id" +'"' +':' + '"' + req.body.id + "\",";
	// resultData += '"'+ "phone" +'"' +':' + '"' + req.body.phone + "\",";
	// resultData += '"'+ "email" +'"' +':' + '"' + req.body.email + "\",";
	// resultData = resultData.substr(0, resultData.length - 1);
	// resultData += '}';
	console.log("Data from submit form");
	var user = new User({
		username:req.body.username,
		password:req.body.password,
		id:req.body.id,
		phone:req.body.phone,
		email:req.body.email
	})
	// var Jsonex = JSON.parse(resultData);
	console.log(user);
	var flag = {one:1,two:1,three:1,four:1};
	errorInfo = "";
	checkDataRep(user, flag, res);
}
function dealWithDataSubmited (user, flag, res) {
	if (!(flag.one&&flag.two&&flag.three&&flag.four)) {
		repreload(res);
	} else {
		user.save(function(err) {
			if (err) {
				console.log('保存失败');
				return;
			}
			console.log('保存成功');
		})
		console.log(user.username + " has been added");
		showInfo(user, res)
	}
}
function findJson(name, res) {
	var testUsername = {username:name};
	User.find(testUsername,function (err, userDetail) {
		if (userDetail.length == 0) {
			console.log(userDetail);
			res.sendFile(path.resolve('view/index.html'));//There doesn't exist

		} else {
			console.log(userDetail);
			console.log("Load user: " + name);
			console.log(userDetail[0]);
			showInfo(userDetail[0], res);
		}
	})
	// for (var x = 0; x < numOfJson; x++) {
	// 	if (jsonArray[x].username == username) {
	// 		break;
	// 	}
	// }
	// if (x == numOfJson) {
	// 	res.sendFile(path.resolve('view/index.html'));//There doesn't exist
	// 	return;
	// } else {
	// 	console.log(jsonArray[x])
	// 	showInfo(jsonArray[x], res);
	// }
}
function showInfo(user, res) {
	fs.readFile(__dirname+'/../view/info.html', function(err, data) {
		var htmlString = data.toString();
		htmlString = htmlString.replace(/username/, (user.username));
        htmlString = htmlString.replace(/idididid/, (user.id));
        htmlString = htmlString.replace(/phonenum/, (user.phone));
        htmlString = htmlString.replace(/email/, (user.email));
        res.send(htmlString);
	})
}
function checkDataRep(user, flag, res) {
	var testUsername = {username:user.username};
	var testId = {id:user.id};
	var testPhone = {phone:user.phone};
	var testEmail = {email:user.email};
	User.find(testUsername, function (err, detail) {
		if (detail.length) {
			flag.one = 0;
			errorInfo = errorInfo + "用户名重复\n";
		}
	})
	User.find(testId, function (err, detail) {
		if (detail.length) {
			flag.two = 0;
			errorInfo = errorInfo + "id重复\n";
		}
	})
	User.find(testPhone, function (err, detail) {
		if (detail.legnth) {
			flag.three = 0;
			errorInfo = errorInfo + "电话号码重复\n";
		}
	})
	User.find(testEmail, function (err, detail) {
		if (detail.legnth ) {
			flag.four = 0;
			errorInfo = errorInfo + "邮箱重复\n";
		}
		dealWithDataSubmited(user, flag, res)
	})

	// for (var x = 0; x < numOfJson; x++) {
    //     if (Jsonex.username == jsonArray[x].username) {
    //         flag.one = 0;
    //         errorInfo = errorInfo + "用户名重复\n";
    //     }
    //     if (Jsonex.id == jsonArray[x].id) {
    //         flag.two = 0;
    //         errorInfo = errorInfo + "id重复\n";
    //     }
    //     if (Jsonex.phone == jsonArray[x].phone) {
    //         flag.three = 0;
    //         errorInfo = errorInfo + "电话号码重复\n";
    //     }
    //     if (Jsonex.email == jsonArray[x].email) {
    //         flag.four = 0;
    //         errorInfo = errorInfo + "邮箱重复\n";
    //     }
    // }
}
function repreload(response) {
    fs.readFile(__dirname+'/../view/index.html', function (err,data) {
        if (err) console.err(err);
        console.log("errorinfo: " + errorInfo);
        var htmlString = data.toString();
        htmlString = htmlString.replace(/请输入信息/, errorInfo);
		response.send(htmlString);
    })
}
