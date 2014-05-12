var mongoose = require('mongoose'),
Dungeon = require('../models/dungeon');
var connStr = 'mongodb://localhost/dnd';
mongoose.connect(connStr, function(err) {
        if (err) throw err;
        console.log('Successfully connected to MongoDB');
});

// create a user a new user
var dungeon = new Dungeon({
	name: 'partytown',
        dm: 'tim',
        gridWidth: 20,
        gridHeight: 20,
        layers: {
                draw: {
			    "attrs": {},
			    "className": "Layer",
			    "children": [{
			        "attrs": {
			            "points": [200, 50, 200, 450],
			            "stroke": "#000000",
			            "strokeWidth": 4
			        },
			        "className": "Line"
			    }, {
			        "attrs": {
			            "points": [550, 450, 550, 50],
			            "stroke": "#000000",
			            "strokeWidth": 4
			        },
			        "className": "Line"
			    }, {
			        "attrs": {
			            "points": [400, 50, 550, 50],
			            "stroke": "#000000",
			            "strokeWidth": 4
			        },
			        "className": "Line"
			    }, {
			        "attrs": {
			            "points": [350, 50, 200, 50],
			            "stroke": "#000000",
			            "strokeWidth": 4
			        },
			        "className": "Line"
			    }, {
			        "attrs": {
			            "points": [200, 450, 550, 450],
			            "stroke": "#000000",
			            "strokeWidth": 4
			        },
			        "className": "Line"
			    }]
			},
                figure: {
			    "attrs": {},
			    "className": "Layer",
			    "children": [{
			        "attrs": {
			            "x": 375,
			            "y": 275,
			            "radius": 21,
			            "fill": "grey",
			            "stroke": "black",
			            "strokeWidth": 4,
			            "draggable": true
			        },
			        "className": "Circle"
			    }]
			}
        }
});

// save dungeon to database
dungeon.save(function(err) {
        if (err) throw err;
        console.log('Dungeon created');
	console.log(dungeon._id.toHexString());
	process.exit();
});



