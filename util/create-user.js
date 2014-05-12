var mongoose = require('mongoose'),
User = require('../models/user');
var connStr = 'mongodb://localhost:27017/dnd';
mongoose.connect(connStr, function(err) {
	if (err) throw err;
	console.log('Successfully connected to MongoDB');
});
 
// create a user a new user
var user = new User({
	username: 'tim',
	password: 'tim'
});

// save user to database
user.save(function(err) {
	if (err) throw err;
	console.log('User created');
});

process.exit();
