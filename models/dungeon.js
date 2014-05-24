var restful = require('node-restful'),
	mongoose = restful.mongoose,
	ObjectId = mongoose.Types.ObjectId,
	DungeonSchema = require('../schemas/dungeon'),
	Dungeon = restful.model('dungeons', DungeonSchema);

Dungeon.methods(['get','post','put','delete'])
	.route('search', function(req, res){
		var regex = new RegExp(req.query.name, 'i');
		Dungeon.find({dm:ObjectId(req.query.dm), name:regex},'_id name', function(err, dungeons){
			if(err) throw err;
			res.json(dungeons);
		});
	});
	
module.exports = Dungeon;
