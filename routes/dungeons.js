var express = require('express');
var router = express.Router();
var Dungeon = require('../models/dungeon');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

router.route('/dungeon/:id?')
.get(function(req, res){
	console.log(req.params.id);
	Dungeon.findById(req.params.id, function(err, dungeon){
		if (err) throw err;
		res.json(dungeon);
	});
})
.post(function(req, res){
	dungeon = new Dungeon(req.body.dungeon, function(err, dungeon){
		dungeon.save(function(err){
			if (err) throw err;
			res.json({success: 'Dungeon created.'});
		});
	});	
})
.put(function(req, res){
	Dungeon.findOneAndUpdate({ _id: req.params.id } , { $set: req.body.update }, function(err, dungeon){
		if (err) throw err;
		if (dungeon){
			res.json(dungeon);
		}else{
			res.json({error: 'Dungeon not found.'});
		}
	});
})
.delete(function(req, res){
	Dungeon.remove({_id: req.params.id}, function(err){
		if (err) throw err;
		res.json({success: 'Dungeon removed'});
	});
});


module.exports = router;
