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
		reveal: Object
	}
});

module.exports = DungeonSchema;