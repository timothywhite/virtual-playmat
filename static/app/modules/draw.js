define(['app', 'module/layers'], function(app){
	app.module('Draw', function(Draw, app, Backbone, Marionette, $, _){
		var drawLayer = app.request('layer','draw'),
			shapeColor = '#000000';

		function _set_event_handlers(shape){
			shape.on('click tap', function(e){
				if(app.request('config', 'toolMode') === 'erase'){
					this.remove();
					drawLayer.draw();
					app.vent.trigger('draw:update');
				}
			});
		};

		app.reqres.setHandler('draw:savedata', function(){
			return app.request('layer', 'draw').toObject();
		});

		app.commands.setHandler('draw:load', function(data){
			app.execute('layer:load', 'draw', data);
		});
		app.commands.setHandler("draw:line", function(points){
			drawLayer = app.request('layer','draw');
			var line = new Kinetic.Line({
				points: points,
				stroke: shapeColor,
				strokeWidth: 4,
				lineCap: 'round'
			});
			_set_event_handlers(line);
			drawLayer.add(line);
			drawLayer.draw();
			app.vent.trigger('draw:update');
		});
		app.commands.setHandler('draw:circle', function(center, radius){
			drawLayer = app.request('layer','draw');
			var circle = new Kinetic.Arc({
				x: center.x,
				y: center.y,
				outerRadius: radius - 2,
				innerRadius: radius - 2 ,
				angle: 360,
				stroke: shapeColor,
				strokeWidth: 4
			});
			_set_event_handlers(circle);
			drawLayer.add(circle);
			drawLayer.draw();
			app.vent.trigger('draw:update');
		});
		app.commands.setHandler('draw:set:shapecolor', function(color){
			shapeColor = color;
		});

		app.commands.setHandler('draw:redraw', function(newCellSize, oldCellSize){
			drawLayer = app.request('layer','draw');
			if (newCellSize && oldCellSize){
				newCellSize = parseInt(newCellSize);
				oldCellSize = parseInt(oldCellSize);
				var delta = newCellSize - oldCellSize;

				drawLayer.getChildren(function(node){
					node.points(node.points().map(function(point){
						return parseInt(point) + (delta * (point / oldCellSize));
					}));
				});
			}
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
