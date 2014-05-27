var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	DungeonSchema = require('./dungeon');
	
var AdventureSchema = new Schema({
	name: String,
	dm: Schema.ObjectId,
	dungeon: Object
});

module.exports = AdventureSchema;