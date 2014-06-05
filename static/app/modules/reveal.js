define(['app', 'kinetic', 'module/layers'], function(app, Kinetic){
	app.module('Ui', function(Ui, app, Backbone, Marionette, $, _){
		var squares = [],
		squareIndexes = [],
		hideShape = new Kinetic.Shape({
			x:0,
			y:0,
			stroke: 'grey',
			fill: 'grey',
			opacity: .5,
			drawFunc: function(context){
				var i, square;

				if (app.request('adventure:isjoined') && !app.request('adventure:isdm')){
					this.fill('white');
					this.stroke('grey');
					this.opacity(1);
				}

				context.beginPath();
				for (i = 0; i < squares.length; i += 1){
					square = squares[i];
					context.moveTo(square[0], square[1]);
					context.lineTo(square[2], square[1]);
					context.lineTo(square[2], square[3]);
					context.lineTo(square[0], square[3]);
					context.lineTo(square[0], square[1]);
				}
				context.fillStrokeShape(this);
			}
		}),
		_get_square = function(pos){
			var cellSize = app.request('config', 'cellSize'),
				x = Math.floor(pos.x / cellSize) * cellSize,
				y = Math.floor(pos.y / cellSize) * cellSize;

			return [x, y, x + cellSize, y + cellSize];
		},
		_get_square_index = function(square){
			return square.join('/');
		},
		_add_square = function(pos){
			if (!_is_hidden(pos)){
				square = _get_square(pos)
				squares.push(square);
				squareIndexes.push(_get_square_index(square));
			}
		},
		_remove_square = function(pos){
			var square = _get_square(pos),
			i = squareIndexes.indexOf(_get_square_index(square));
			if (i !== -1){
				squareIndexes.splice(i, 1);
				squares.splice(i, 1);
			}
		},
		_is_hidden = function(pos){
			var square = _get_square(pos);
			return squareIndexes.indexOf(_get_square_index(square)) !== -1;
		};

		app.reqres.setHandler('reveal:ishidden', _is_hidden);

		app.commands.setHandler('reveal:add', function(pos){
			var revealLayer = app.request('layer', 'reveal');
			_add_square(pos);
			if (revealLayer.getChildren().length === 0) revealLayer.add(hideShape);
			revealLayer.draw();
			app.vent.trigger('reveal:update');
		});
		app.commands.setHandler('reveal:remove', function(pos){
			var revealLayer = app.request('layer', 'reveal');
			_remove_square(pos);
			if (revealLayer.getChildren().length === 0) revealLayer.add(hideShape);
			revealLayer.draw();
			app.vent.trigger('reveal:update');
		});
		app.commands.setHandler('reveal:all', function(){
			var revealLayer = app.request('layer', 'reveal');
			squares = [];
			squareIndexes = [];
			revealLayer.draw();
			app.vent.trigger('reveal:update');
			app.execute('figure:reveal:all');
		});
		app.commands.setHandler('reveal:none', function(){
			var revealLayer = app.request('layer', 'reveal'),
				cellSize = app.request('config', 'cellSize'),
				gridWidth = app.request('config', 'gridWidth'),
				gridHeight = app.request('config', 'gridHeight'),
				w, h;
			for (w = 0; w < gridWidth * cellSize; w += cellSize){
				for (h = 0; h < gridHeight * cellSize; h += cellSize){
					_add_square({x: w, y: h});
				}
			}
			if (revealLayer.getChildren().length === 0) revealLayer.add(hideShape);
			revealLayer.draw();
			app.vent.trigger('reveal:update');
			app.execute('figure:reveal:none');
		});
		app.vent.on('layer:before:load:reveal', function(){
			//app.request('layer','reveal').getChildren(_init_square);
		});
	});
});
