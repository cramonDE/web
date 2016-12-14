var express = require('express')
var server = require('./server')
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app) {
	app.get('/', function(req, res) {
		server.signin(req, res);
	})
	app.get('/regist', function(req, res) {
		server.signup(req, res);
	})
	app.post('/info',  urlencodedParser,function(req, res) {
		server.info(req, res);
	})
	app.post('/check', urlencodedParser, function(req, res) {
		server.check(req, res);
	})
	app.use(express.static(__dirname + '/public'));
}
