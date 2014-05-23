define(['marionette','app','module/init'], function(){
	app.module("Dashboard", function(Dashboard, app, Backbone, Marionette, $, _){
		$(function(){
			var $canvasWrap = $('.canvas-wrap'), 
				$dungeonName = $('.js-dungeon-name'),
				$dungeonScale = $('.js-dungeon-scale'),
				$dungeonGridWidth = $('.js-dungeon-grid-width'),
				$dungeonGridHeight = $('.js-dungeon-grid-height'),
				_hide_canvas = function(){
					$canvasWrap.hide();
				},
				_show_canvas = function(){
					$canvasWrap.show();
				},
				_get_canvas_width = function(){
					return $canvasWrap.width();
				},
				_get_canvas_height = function(){
					return $canvasWrap.height();
				},
				_get_dungeon_name = function(){
					return $dungeonName.html();
				},
				_set_dungeon_name = function(name){
					$dungeonName.html(name);
				},
				_get_dungeon_grid_width = function(){
					return $dungeonGridWidth.val();
				},
				_set_dungeon_grid_width = function(width){
					$dungeonGridWidth.val(width);
				},
				_get_dungeon_grid_height = function(){
					return $dungeonGridHeight.val();
				},
				_set_dungeon_grid_height = function(height){
					$dungeonGridHeight.val(height);
				},
				_get_dungeon_scale = function(){
					return $dungeonScale.val();
				},
				_set_dungeon_scale = function(scale){
					$dungeonScale.val(scale);
				};
				
			//Tool selection click events
			$('.js-tool-line').click(function(){
				app.execute('config:set', 'toolMode', 'line'); 
				app.execute('stage:setdraggable', false);
			});	
			$('.js-tool-erase').click(function(){
				app.execute('config:set', 'toolMode', 'erase'); 
				app.execute('stage:setdraggable', false);
			});
			$('.js-tool-move').click(function(){
				app.execute('config:set', 'toolMode', 'move');
				app.execute('stage:setdraggable', true);
			});
			//Shape stroke color change event
			$('.js-shape-color').change(function(){
				app.execute('draw:set:shapecolor',$(this).val());
			});
			//add figure click event
			$('.js-add-figure').click(function(){
				app.execute('figure:add', {
					fill: $('.js-figure-fill-color').val(), 
					stroke: $('.js-figure-stroke-color').val(), 
					label: $('.js-figure-label').val()
				});
			});
			
			$(window).resize(function(e){
				$canvasWrap.height(window.innerHeight - ($('.navbar').outerHeight() + $('.controls').outerHeight())).css({'margin-top': $('.navbar').outerHeight()});
				app.execute('stage:resize');
			});
			
			$('.form-dropdown input').click(function(e){
				e.stopPropagation();
			});
			$('.js-dungeon-search').keyup(function(e){
				app.request('dungeon:search', $(this).val(), function(dungeons){
					$list = $('.js-dungeon-results').html('');
					dungeons.forEach(function(dungeon){
						$list.append('<li><a class="js-dungeon-link" href="#" data-_id= "' + dungeon._id + '" data-name="' + dungeon.name + '">' + dungeon.name + '</a></li>');
					});
					
					$('.js-dungeon-link').click(function(e){
						app.execute('dungeon:load', $(this).data('_id'), function(data){
							_set_dungeon_grid_width(data.gridWidth);
							_set_dungeon_grid_height(data.gridHeight);
							_set_dungeon_name(data.name);
							_show_canvas();
						});
					});
				});
			});
			$('.js-dungeon-create').click(function(e){
				var name = $('.js-dungeon-create-name').val(),
				    gridWidth = $('.js-dungeon-create-grid-width').val(),
				    gridHeight = $('.js-dungeon-create-grid-height').val();
				if(name && gridWidth && gridHeight){
					app.execute('dungeon:create', name, gridWidth, gridHeight);
					_set_dungeon_grid_width(gridWidth);
					_set_dungeon_grid_height(gridHeight);
					_show_canvas();
				}else{
					console.log('fill out the form.');
				}
			});
			$('.js-dungeon-delete').click(function(e){
				app.execute('dungeon:delete');
				_set_dungeon_name('');
				_hide_canvas();
			});
			$('.js-dungeon-save').click(function(e){
				app.execute('dungeon:save');
			});
			$('.js-dungeon-grid-width').change(function(e){
				app.execute('config:set', 'gridWidth', _get_dungeon_grid_width());
				app.execute('grid:redraw');
				app.execute('ui:redraw');
			});
			$('.js-dungeon-grid-height').change(function(e){
				app.execute('config:set', 'gridHeight', _get_dungeon_grid_height());
				app.execute('grid:redraw');
				app.execute('ui:redraw');
			});
			$('.js-dungeon-scale').change(function(e){
				app.execute('stage:setscale',$(this).val());
			});
			
			app.reqres.setHandler('dashboard:dungeonname', _get_dungeon_name);
			app.reqres.setHandler('dashboard:canvaswidth', _get_canvas_width);
			app.reqres.setHandler('dashboard:canvasheight', _get_canvas_height);
			app.reqres.setHandler('dashboard:dungeonscale', _get_dungeon_scale);
			app.reqres.setHandler('dashboard:dungeongridwidth', _get_dungeon_grid_width);
			app.reqres.setHandler('dashboard:dungeongridheight', _get_dungeon_grid_height);
			
			app.commands.setHandler('dashboard:setname', _set_dungeon_name);
			app.commands.setHandler('dashboard:showcanvas', _show_canvas);
			app.commands.setHandler('dashboard:hidecanvas', _hide_canvas);
		});
	});
});
