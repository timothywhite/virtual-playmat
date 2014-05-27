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
		}
		app.commands.setHandler('reveal:add', function(pos){
			var revealLayer = app.request('layer', 'reveal'),
				cellSize = app.request('config', 'cellSize'),
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
			revealLayer.add(square);
			revealLayer.draw();
			app.vent.trigger('reveal:update');
		});

		app.vent.on('layer:before:load:reveal', function(){
			app.request('layer','reveal').getChildren(_init_square);			
		});
	});
});
