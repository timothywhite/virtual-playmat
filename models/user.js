var mongoose = require('mongoose'),
	UserSchema = require('../schemas/user');
module.exports = mongoose.model('users',UserSchema);