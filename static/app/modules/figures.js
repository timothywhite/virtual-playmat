define(['app', 'module/layers'], function(app){
	app.module('Figures', function(Figures, app, Backbone, Marionette, $, _){
		var stage = app.request('stage'),
		figureLayer = app.request('layer','figure'),
		cellSize = app.request('config','cellSize');
		function _init_figure(figure){
			//figures being loaded from json need their coordinates parsed to integers.
			figure.x(parseInt(figure.x()));
			figure.y(parseInt(figure.y()));

			figure.on('dblclick', function(e){
				if (app.request('config', 'toolMode') == 'erase'){
					figure.remove();
					figureLayer.draw();
				}
			});
			figure.on('dragstart', function(e){
				figure.moveToTop();
				app.vent.trigger('figure:pickup', figure);
			});
			figure.on('dragend', function(e){
				var posx = this.x() + cellSize / 2,
					posy = this.y() + cellSize / 2,
					x = Math.floor(posx / cellSize) * cellSize,
					y = Math.floor(posy / cellSize) * cellSize;
				this.x(x);
				this.y(y);
				figureLayer.draw();
				app.vent.trigger('figure:drop', figure);
			});
			figure.dragBoundFunc(function(pos){
				stage = app.request('stage');
				data = {
					x: (pos.x < 0 ? 0 : pos.x > stage.getWidth() ? stage.getWidth() : pos.x),
					y: (pos.y < 0 ? 0 : pos.y > stage.getHeight() ? stage.getHeight() : pos.y)
				};
				return data;
			});
		}
		app.commands.setHandler('figure:add',function(options){
			figureLayer = app.request('layer','figure');
			cellSize = app.request('config','cellSize');
			figure = new Kinetic.Group({
				draggable:true
			});
			background = new Kinetic.Circle({
				x: cellSize / 2,
				y: cellSize / 2,
				radius: cellSize/2 - 4,
				fill: options.fill,
				stroke: options.stroke,
				strokeWidth: 4
			});
			var fontHeight = cellSize / Math.max(options.label.length, 2),
				fontWidth = fontHeight / 1.7;
			label = new Kinetic.Text({
				x: cellSize / 2 - (fontWidth / 2) * options.label.length,
				y: cellSize / 2 - fontHeight / 2,
				fontFamily: 'Courier New',
				fontSize: fontHeight,
				fill: 'black',
				text: options.label
			});
			figure.add(background);
			figure.add(label);
			_init_figure(figure);
			figureLayer.add(figure);
			figureLayer.draw();
		});
		
		app.commands.setHandler('figure:redraw', function(){
			figureLayer = app.request('layer','figure');
			figureLayer.draw();
		});
		
		app.commands.setHandler('figure:sethandlers', function(){
			figureLayer = app.request('layer','figure');
			figureLayer.getChildren(_init_figure);
		});
		
		app.vent.on('layer:load:figure', function(){
			figureLayer = app.request('layer','figure');
			figureLayer.draw();
			figureLayer.getChildren(function(child){
				return child.getClassName() === 'Group';
			}).forEach(_init_figure);
		});
	});
});
