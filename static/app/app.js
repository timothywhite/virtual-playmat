define(['marionette'],function(){

	app = new Backbone.Marionette.Application();
	
	//make the config available before initialization of any modules
	app.on('initialize:before',function(options){
		var config = options;
		app.reqres.setHandler('config', function(key){
			return config[key];
		});
		app.commands.setHandler('config:set', function(key, value){
			config[key] = value;
		});
		app.commands.setHandler('config:setgrid', function(width, height){
			config['gridWidth'] = width;
			config['gridHeight'] = height;
			
			app.vent.trigger('config:gridset');
		});
	});
	
	app.start({
		stageContainer: 'canvas',
		scale: 1.0,
		cellSize: 50,
		gridWidth: 0,
		gridHeight: 0,
		toolMode: 'line'
	});
	return app;
});
