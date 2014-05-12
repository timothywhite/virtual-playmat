var mongoose = require('mongoose'),
Dungeon = require('../models/dungeon');
var connStr = 'mongodb://localhost:27017/dnd';
mongoose.connect(connStr, function(err) {
        if (err) throw err;
        console.log('Successfully connected to MongoDB');
});


Dungeon.find({dm:'tim'}, function(err, dungeons){
	console.log(dungeons);
});

process.exit()
