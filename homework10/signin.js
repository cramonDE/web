var express = require('express');
var app = express();
var routes = require('./routes/routes')(app);
var path = require('path')
console.log('Listening on port 8000');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(8000);
