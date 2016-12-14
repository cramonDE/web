var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
//骨架模版
var userSchema = new Schema({
    username   : String,
    password   : String,
    id    : String,
    phone : String,
    email  : String
})



var User = mongoose.model('User', userSchema);
module.exports = User;
