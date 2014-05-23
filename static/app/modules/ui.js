define(['marionette', 'app', 'module/layers'], function(){
	app.module('Ui', function(Ui, app, Backbone, Marionette, $, _){
		var stage = app.request('stage'),
		uiLayer = app.request('layer','ui'),
		hitLayer = app.request('layer','hit'),
		cellSize = app.request('config','cellSize'),
		gridWidth = app.request('config', 'gridWidth'),
		gridHeight = app.request('config', 'gridHeight'),
		_get_pointer_position = function(){
			var pos = stage.getPointerPosition(),
			    scale = app.request('dashboard:dungeonscale');
			return {
				x: (pos.x - stage.x()) / scale,
				y: (pos.y - stage.y()) / scale
			}
		},
		hoverCircle = new Kinetic.Circle({
			x: 0,
			y: 0,
			radius: cellSize/4,
			stroke: 'black',
			strokeWidth: 1,
			visible: false
		}),
		selectCircle = new Kinetic.Circle({
			x: 0,
			y: 0,
			radius: cellSize/4,
			stroke: 'red',
			strokeWidth: 1,
			visible: false
		});
		hoverCircle.on('mouseleave', function(e){
			hoverCircle.hide();
			uiLayer.draw();
		});
		hoverCircle.on('click', function(e){
			if (!selectCircle.visible()){
				selectCircle.x(this.x());
				selectCircle.y(this.y());
				selectCircle.show();
				uiLayer.draw();
			}else{
				app.execute('draw:line',[selectCircle.x(),selectCircle.y(),this.x(),this.y()]);
				selectCircle.hide();
				uiLayer.draw();
			}
		});
		selectCircle.on('click', function(e){
			selectCircle.hide();
			uiLayer.draw();
		});
		uiLayer.add(hoverCircle);
		uiLayer.add(selectCircle);
		
		var hitRect = new Kinetic.Rect({
			x: 0,
			y: 0,
			width: gridWidth * cellSize,
			height: gridHeight * cellSize
		});
		hitRect.on('mousemove', function(e){
			if (app.request('config', 'toolMode') === 'line'){
				var pos = _get_pointer_position(),
				mousex = pos.x,
				mousey = pos.y,
				hitCellSize = cellSize/2,
				radius = hitCellSize / 4,
				x1 = Math.floor(mousex / hitCellSize) * hitCellSize,
				x2 = Math.floor(mousex / hitCellSize) * hitCellSize + hitCellSize,
	 			y1 = Math.floor(mousey / hitCellSize) * hitCellSize,
				y2 = Math.floor(mousey / hitCellSize) * hitCellSize + hitCellSize,
				x = Math.abs(mousex - x1) < (hitCellSize / 2) ? x1 : x2,
				y = Math.abs(mousey - y1) < (hitCellSize / 2) ? y1 : y2,
				deltax = mousex - x, 
				deltay = mousey - y,
				delta = Math.sqrt((deltax * deltax) + (deltay * deltay));
				if(delta <= radius){
					hoverCircle.x(x);
					hoverCircle.y(y);
					hoverCircle.radius(radius)
					hoverCircle.show();
					uiLayer.draw();
					setTimeout(function(){
						if (hoverCircle.x() === x && hoverCircle.y() === y && hoverCircle.visible()){
							var pos = stage.getPointerPosition()
							if (pos){
								mousex = (pos.x - stage.x()) / app.request('dashboard:dungeonscale'),
								mousey = (pos.y - stage.y()) / app.request('dashboard:dungeonscale'),
								deltax = mousex - x,
								deltay = mousey - y,
								delta = Math.sqrt((deltax * deltax) + (deltay * deltay));
							}
							if (delta > radius || !pos){
								hoverCircle.hide();
								uiLayer.draw();
							}
						}
					}, 100);
				} else {
					if (hoverCircle.visible()){
						hoverCircle.hide();
						uiLayer.draw();
					}
				}
			}
		});
		hitRect.on('click', function(e){
			if (app.request('config', 'toolMode') === 'reveal'){
				app.execute('reveal:add', _get_pointer_position());
			}
		});
		hitLayer.add(hitRect);
		
		function _draw_hit_rect(){
			var cellSize = app.request('config','cellSize'),
			gridWidth = app.request('config', 'gridWidth'),
			gridHeight = app.request('config', 'gridHeight');
			
			hitRect.width(gridWidth * cellSize);
			hitRect.height(gridHeight * cellSize);
			hitLayer.drawHit();
		}
		
		app.commands.setHandler('ui:redraw', _draw_hit_rect);
		app.vent.on('config:gridset',_draw_hit_rect);
	});
});
