var express = require('express')
var routes = require('./server')
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session')
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app) {
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// app.use(function(req, res, next) {
// 	var sess = req.session
// 	if (sess.views) {
// 	sess.views++
// 	res.setHeader('Content-Type', 'text/html')
// 	res.write('<p>views: ' + sess.views + '</p>')
// 	res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
// 	res.end()
// 	} else {
// 	sess.views = 1
// 	res.end('welcome to the session demo. refresh!')
// 	}
// })
	// app.get('/', function(req, res) {
	// 	server.signin(req, res);
	// })
	// app.get('/regist', function(req, res) {
	// 	server.signup(req, res);
	// })
	// app.get('/logout', function(req, res) {
	// 	server.logout(req, res);
	// })
	// app.post('/info',  urlencodedParser,function(req, res) {
	// 	server.info(req, res);
	// })
	// app.post('/check', urlencodedParser, function(req, res) {
	// 	server.check(req, res);
	// })

	app.use('/',routes);
	app.use('/regist',routes);
	app.use('/logout',routes);
	app.use('/info',routes);
	app.use('/check', routes);
	app.use(express.static(__dirname + '/public'));
}
