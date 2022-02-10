var mongoose =require('mongoose')
var UserSchema =require('./user.schema')

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel
