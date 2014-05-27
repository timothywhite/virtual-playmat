define(['app', 'kinetic', 'module/layers'], function(app, Kinetic){
        app.module('Ui', function(Ui, app, Backbone, Marionette, $, _){
		var _init_square = function(square){
			
			if (app.request('adventure:isjoined') && !app.request('adventure:isdm')){
				square.fill('white');
				square.stroke('grey');
				square.opacity(1);
			}
			square.on('click', function(e){
				if (app.request('config', 'toolMode') === 'reveal'){
                                	this.remove();
                                	app.request('layer','reveal').draw();
					app.vent.trigger('reveal:update');
				}
                        });
		},
		_build_square = function(pos){
			var cellSize = app.request('config', 'cellSize'),
                                x = Math.floor(pos.x / cellSize) * cellSize,
                                y = Math.floor(pos.y / cellSize) * cellSize,
                                square = new Kinetic.Rect({
                                        width: cellSize,
                                        height: cellSize,
                                        x: x,
                                        y: y,
                                        fill: 'grey',
                                        stroke: 'grey',
                                        strokeWidth: 1,
                                        opacity: .5
                                });
                        _init_square(square);
			return square;
		};
		app.commands.setHandler('reveal:add', function(pos){
			var revealLayer = app.request('layer', 'reveal');
			revealLayer.add(_build_square(pos));
			revealLayer.draw();
			app.vent.trigger('reveal:update');
		});
		app.commands.setHandler('reveal:all', function(){
			var revealLayer = app.request('layer', 'reveal');
			revealLayer.removeChildren();
			revealLayer.draw();
			app.vent.trigger('reveal:update');
		});
		app.commands.setHandler('reveal:none', function(){
			var revealLayer = app.request('layer', 'reveal'),
				cellSize = app.request('config', 'cellSize'),
				gridWidth = app.request('config', 'gridWidth'),
				gridHeight = app.request('config', 'gridHeight'),
				w, h;
			revealLayer.removeChildren();
			for (w = 0; w < gridWidth * cellSize; w += cellSize){
				for (h = 0; h < gridHeight * cellSize; h += cellSize){
					revealLayer.add(_build_square({x: w, y: h}));
				}
			}
			revealLayer.draw();
			app.vent.trigger('reveal:update');
		});

		app.vent.on('layer:before:load:reveal', function(){
			app.request('layer','reveal').getChildren(_init_square);			
		});
	});
});
