var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	DungeonSchema = require('./dungeon');
	
var AdventureSchema = new Schema({
	dm: Schema.ObjectId,
	dungeon: DungeonSchema
});

module.exports = AdventureSchema;