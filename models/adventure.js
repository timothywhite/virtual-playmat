var restful = require('node-restful'),
	mongoose = restful.mongoose,
	AdventureSchema = require('../schemas/adventure'),
	Adventure = restful.model('adventures', AdventureSchema);

Adventure.methods(['get','post','put','delete'])
	.route('search', function(req, res){
		var regex = new RegExp(req.query.name, 'i');
		Adventure.find({name:regex},'_id name', function(err, adventures){
			if(err) throw err;
			res.json(adventures);
		});
	});
	
module.exports = Adventure;