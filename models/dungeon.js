var restful = require('node-restful'),
	mongoose = restful.mongoose,
	Schema = mongoose.Schema,
	ObjectId = mongoose.Types.ObjectId;


var DungeonSchema = new Schema({
	name: String,
	dm: Schema.ObjectId,
	gridWidth: Number,
	gridHeight: Number,
	cellSize: Number,
	layers: {
		draw: Object,
		figure: Object
	}
});

var Dungeon = restful.model('dungeons', DungeonSchema);

Dungeon.methods(['get','post','put','delete'])
	.route('search', function(req, res){
		var regex = new RegExp(req.query.name, 'i');
		Dungeon.find({dm:ObjectId(req.query.dm), name:regex},'_id name', function(err, dungeons){
			if(err) throw err;
			res.json(dungeons);
		});
	});
	
module.exports = Dungeon;
