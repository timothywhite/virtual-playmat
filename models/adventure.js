var restful = require('node-restful'),
	mongoose = restful.mongoose,
	AdventureSchema = require('../schemas/adventure'),
	Adventure = restful.model('adventures', AdventureSchema);

Adventure.methods(['get','post','put','delete']);

module.exports = Adventure;