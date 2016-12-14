var mongoose = require("mongoose");

// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
//骨架模版
var movieSchema = new Schema({
    doctor   : String,
    title    : String,
    language : String,
    country  : String,
    year     : Number,
    summary  : String,
    poster   : String,
    flash    : String
})
//模型
var Movie = mongoose.model('Movie', movieSchema);
//存储数据
var moive = new Movie({
    title: '黑衣人三',
    doctor: '美国队长',
    year: 2018,
    flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
    country: '美国',
    language: '英语',
    summary: '好片'
})
//保存数据库
moive.save(function(err) {
    if (err) {
        console.log('保存失败')
        return;
    }
    console.log('meow');
});


var movies = {doctor:"美国队长"};
Movie.findOne(movies,function (err, movies) {
	if (!err) {
		console.log(movies.year);
	}
})
