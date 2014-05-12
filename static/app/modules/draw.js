define(['marionette', 'app', 'module/layers'], function(){
	app.module('Draw', function(Draw, app, Backbone, Marionette, $, _){
		var drawLayer = app.request('layer','draw'),
			shapeColor = '#000000';
			
		function _set_event_handlers(shape){
			shape.on('dblclick dbltap', function(e){
				if(app.request('config', 'toolMode') === 'erase'){
					this.remove();
					drawLayer.draw();
				}
			});
		};
		app.commands.setHandler("draw:line", function(points){
			drawLayer = app.request('layer','draw');
			var line = new Kinetic.Line({
				points: points,
				stroke: shapeColor,
				strokeWidth: 4
			});
			_set_event_handlers(line);
			drawLayer.add(line);
			drawLayer.draw();
		});
		app.commands.setHandler('draw:set:shapecolor', function(color){
			shapeColor = color;
		});
		
		app.commands.setHandler('draw:redraw', function(){
			drawLayer = app.request('layer','draw');
			drawLayer.draw();
		});
		app.commands.setHandler('draw:sethandlers', function(){
			drawLayer = app.request('layer','draw');
			drawLayer.getChildren(_set_event_handlers);
		});
		
		app.vent.on('layer:load:draw', function(){
			drawLayer = app.request('layer','draw');
			drawLayer.draw();
			drawLayer.getChildren(_set_event_handlers);
		});
		
	});
});
