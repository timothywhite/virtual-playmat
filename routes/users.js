var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.route('/login')
.get(function(req, res){
	res.render('login');
})
.post(function(req, res){
	var username = req.body.username,
		password = req.body.password
	User.findOne({username: username}, function(err,user){
		if (err) throw err;
		user.comparePassword(password, function(err, isMatch) {
			if (err) throw err;
			if(isMatch) {
				req.session.user = user;
				res.json({success: 'fuck yeah!'});
			} else{
				res.json({error: 'Invalid login.'});
			}
		});
	});
});

router.route('/logout')
.get(function(req,res){
	req.session.destroy(function(err){
		if(err) throw err;
		res.redirect('login')
	});
});

module.exports = router;
