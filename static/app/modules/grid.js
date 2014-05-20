define(['marionette', 'kinetic', 'app', 'module/layers'], function(){
	app.module("Grid", function(Grid, app, Backbone, Marionette, $, _){
		function _draw_grid(){
			var layer = app.request('layer','grid'),
				cellSize = app.request('config','cellSize'),
				gridHeight = app.request('config','gridHeight'),
				gridWidth = app.request('config','gridWidth');
				layer.removeChildren();
			for (var y = 0; y <= gridHeight * cellSize; y += cellSize){		
				layer.add(new Kinetic.Line({
					points: [0,y,gridWidth * cellSize,y],
					stroke: 'grey',
					strokeWidth: 1,
					lineCap: 'round',
					lineJoin: 'round'
				}));
			}
			for (var x = 0; x <= gridWidth * cellSize; x += cellSize){
				layer.add(new Kinetic.Line({
					 points: [x,0,x,gridHeight * cellSize],
					 stroke: 'grey',
					 strokeWidth: 1,
					 lineCap: 'round',
					 lineJoin: 'round'
				 }));
			 }
			layer.drawScene();
		}
		
		app.commands.setHandler('grid:redraw', _draw_grid);
		app.commands.setHandler('redraw', _draw_grid);
		app.vent.on('config:gridset',_draw_grid);
	});
});
