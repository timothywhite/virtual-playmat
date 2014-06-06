var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var DungeonSchema = new Schema({
	name: String,
	dm: Schema.ObjectId,
	gridWidth: Number,
	gridHeight: Number,
	cellSize: Number,
	layers: {
		draw: Object,
		figure: Object,
		reveal: {type: Object, default: {squares: []}}
	}
});

module.exports = DungeonSchema;
