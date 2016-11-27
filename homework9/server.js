var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var port = 3000;

http.createServer(function(req,res){
    console.log("request received");
  var pathname = url.parse(req.url).pathname;
  var mimeType = getMimeType(pathname);
  if (!!mimeType) {
    handlePage(req, res, pathname);
  } else {
    handleAjax(req, res);
  }
}).listen(port, function(){
  console.log('server listen on ', port);
});

function getMimeType(pathname) {
  var validExtensions = {
    ".html" : "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png"
  };
  var ext = path.extname(pathname);
  var type = validExtensions[ext];
  return type;
}

function handlePage(req, res, pathname) {
  var filePath = __dirname + pathname;
  var mimeType = getMimeType(pathname);
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, function(err, data){
      if (err) {
        res.writeHead(500);
        res.end();
      } else {
        res.setHeader("Content-Length", data.length);
        res.setHeader("Content-Type", mimeType);
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else {
    res.writeHead(500);
    res.end();
  }
}

function handleAjax(req, res) {
  console.log("deal with Ajax");
  var random_time = 1000+getRandomNumber(1000);
  var random_num  = 1 + getRandomNumber(9);
  setTimeout(function(){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("" + random_num);
  }, random_time);
}

function getRandomNumber(limit) {
  return Math.round(Math.random() * limit);
}
