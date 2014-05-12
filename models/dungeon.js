var restful = require('node-restful'),
	mongoose = restful.mongoose;
	Schema = mongoose.Schema;


var DungeonSchema = new Schema({
	name: String,
	dm: String,
	gridWidth: Number,
	gridHeight: Number,
	layers: {
		draw: Object,
		figure: Object
	}
});

var Dungeon = restful.model('dungeons', DungeonSchema);

Dungeon.methods(['get','post','put','delete'])
	.route('dm', function(req, res){
		console.log('works');
		Dungeon.find({dm:req.query.dm}, function(err, dungeons){
			if(err) throw err;
			res.json(dungeons);
		});
	});
	
module.exports = Dungeon;


