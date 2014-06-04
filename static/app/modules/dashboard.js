define(['app','module/init'], function(app){
	app.module("Dashboard", function(Dashboard, app, Backbone, Marionette, $, _){
		$(function(){
			var $canvasWrap = $('.canvas-wrap'),
				$dungeonName = $('.js-dungeon-name'),
				$dungeonScale = $('.js-dungeon-scale'),
				$dungeonGridWidth = $('.js-dungeon-grid-width'),
				$dungeonGridHeight = $('.js-dungeon-grid-height'),
				$dungeonMenu = $('.js-dungeon-menu'),
				$dungeonControls = $('.controls'),
				$dungeonTopNav = $('.js-dungeon-top-nav'),
				$adventureTopNav = $('.js-adventure-top-nav'),
				$adventureName = $('.js-adventure-name'),
				$adventureMenu = $('.js-adventure-menu'),
				$dmOnly = $('.js-dm-only'),
				previousToolMode,
				_hide_canvas = function(){
					$canvasWrap.hide();
				},
				_show_canvas = function(){
					$canvasWrap.show();
				},
				_hide_dungeon_menu = function(){
					$dungeonMenu.addClass('hidden');
				},
				_show_dungeon_menu = function(){
					$dungeonMenu.removeClass('hidden');
				},
				_hide_controls = function(){
					$dungeonControls.addClass('hidden');
					$dungeonTopNav.addClass('hidden');
					_size_canvas();
				},
				_show_controls = function(){
					$dungeonControls.removeClass('hidden');
					$dungeonTopNav.removeClass('hidden');
					_size_canvas();
				},
				_hide_adventure_top_nav = function(){
					$adventureTopNav.addClass('hidden');
				},
				_show_adventure_top_nav = function(){
					$adventureTopNav.removeClass('hidden');
				},
				_hide_adventure_menu = function(){
					$adventureMenu.addClass('hidden');
				},
				_show_adventure_menu = function(){
					$adventureMenu.removeClass('hidden');
				},
				_hide_dm_only = function(){
					$dmOnly.addClass('hidden');
				},
				_show_dm_only = function(){
					$dmOnly.removeClass('hidden');
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
				},
				_get_adventure_name = function(){
					return $adventureName.html();
				},
				_set_adventure_name = function(name){
					$adventureName.html(name);
				},
				_size_canvas = function(){
					$canvasWrap.height(window.innerHeight - ($('.navbar').outerHeight() + ($('.controls').css('display') === "none" ? 0 : $('.controls').outerHeight())))
						.css({'margin-top': $('.navbar').outerHeight()});
					app.execute('stage:resize');
				},
				_set_view_adventure = function(data){
					_set_dungeon_grid_width(data.dungeon.gridWidth);
                                        _set_dungeon_grid_height(data.dungeon.gridHeight);
                                        _set_dungeon_name(data.dungeon.name);
                                        _set_adventure_name(data.name);
                                        _show_canvas();
                                        _show_adventure_top_nav();
                                        _hide_adventure_menu();
                                        if(app.request('adventure:isdm')){
                                                _show_controls();
                                                _show_dm_only();
                                        }else{
                                                _hide_dm_only();
                                                _hide_dungeon_menu();
                                        }
				},
				_set_view_dungeon = function(data){
					_set_dungeon_grid_width(data.gridWidth);
                                        _set_dungeon_grid_height(data.gridHeight);
                                        _set_dungeon_name(data.name);
                                        _show_controls();
                                        _show_canvas();
				};

			//Tool selection events
			$('.js-tool-line').click(function(){
				app.execute('config:set', 'toolMode', 'line');
				app.execute('stage:setdraggable', false);
			});
			$('.js-tool-circle').click(function(){
				app.execute('config:set', 'toolMode', 'circle');
				app.execute('stage:setdraggable', false);
			});
			$('.js-tool-erase').click(function(){
				app.execute('config:set', 'toolMode', 'erase');
				app.execute('stage:setdraggable', false);
			});
			$('.js-tool-reveal').click(function(){
				app.execute('config:set', 'toolMode', 'reveal');
				app.execute('stage:setdraggable', false);
			});
			$('.js-tool-move').click(function(){
				app.execute('config:set', 'toolMode', 'move');
				app.execute('stage:setdraggable', true);
			});
			$(window).keydown(function(e){
				if (e.keyCode === 16){
					previousToolMode = app.request('config', 'toolMode');
					app.execute('config:set', 'toolMode', 'move');
					app.execute('stage:setdraggable', true);
				}
			});
			$(window).keyup(function(e){
				if (e.keyCode === 16){
					app.execute('config:set', 'toolMode', previousToolMode);
					app.execute('stage:setdraggable', false);
				}
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
			$('.js-save-figure').click(function(e){
				var cellSize = app.request('config', 'cellSize'),
				figureOptions = {
					fill: $('.js-figure-fill-color').val(),
					stroke: $('.js-figure-stroke-color').val(),
					label: $('.js-figure-label').val()
				},
				figure = app.request('figure:new', figureOptions);
				figureLayer = app.request('layer', 'figure');
				stage = app.request('stage');
				scale = stage.scale();
				stage.scale({x: 1, y: 1});
				figureLayer.add(figure);
				dataUrl = figure.toDataURL({
					width: cellSize,
					height: cellSize
				});
				figure.remove();
				stage.scale(scale);
				$element = $('<li><a class="js-load-figure" data-stroke="' + figureOptions.stroke + '" data-fill="' + figureOptions.fill + '" data-label="' + figureOptions.label + '"><img src="' + dataUrl + '"></a></li>');
				$('.js-saved-figures').append($element);
				$element
					.find('.js-load-figure')
						.click(function(e){
							var $this = $(this);
							$('.js-figure-fill-color').val($this.data('fill'));
							$('.js-figure-stroke-color').val($this.data('stroke'));
							$('.js-figure-label').val($this.data('label'));
						})
						.dblclick(function(e){
							var $this = $(this);
							app.execute('figure:add', {
								fill: $this.data('fill'),
								stroke: $this.data('stroke'),
								label: $this.data('label')
							});
						});
			});

			$('.js-reveal-all').click(function(){
				app.execute('reveal:all');
			});
			$('.js-hide-all').click(function(){
				app.execute('reveal:none');
			});
			$(window).resize(function(e){
				_size_canvas();
			});
			$(_size_canvas);

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
							_set_view_dungeon(data);
						});
					});
				});
			});
			$('.js-adventure-search').keyup(function(e){
				app.request('adventure:search', $(this).val(), function(adventures){
					$list = $('.js-adventure-results').html('');
					adventures.forEach(function(adventure){
						$list.append('<li><a class="js-adventure-link" href="#" data-_id= "' + adventure._id + '" data-name="' + adventure.name + '">' + adventure.name + '</a></li>');
					});
					$('.js-adventure-link').click(function(e){
						app.execute('adventure:join', $(this).data('_id'), function(data){
							_set_view_adventure(data);
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
					_set_view_dungeon({
						name: name,
						gridWidth: gridWidth,
						gridHeight: gridHeight
					});
				}else{
					console.log('fill out the form.');
				}
			});
			$('.js-dungeon-delete').click(function(e){
				app.execute('dungeon:delete');
				_set_dungeon_name('');
				_hide_controls();
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
				var scale = parseFloat($(this).val());
				app.execute('stage:setscale',scale);
			});
			$('.canvas-wrap').bind('mousewheel', function(e){
				delta = Math.floor(e.originalEvent.wheelDelta / 120) / 10;
				$('.js-dungeon-scale').val(Math.max(0, parseFloat($('.js-dungeon-scale').val()) + delta));
				$('.js-dungeon-scale').change();
			});
			$('.js-adventure-create').click(function(e){
				var name = $('.js-adventure-create-name').val();
				if (name){
					app.execute('adventure:create', name, function(data){
						_set_view_adventure(data);
					});
				}
			});
			$('.js-adventure-end').click(function(e){
				app.execute('adventure:end');
			});
			$('.js-adventure-leave').click(function(e){
				app.execute('adventure:leave');
				_hide_canvas();
				_hide_controls();
				_hide_dm_only();
				_hide_adventure_top_nav();
				_show_dungeon_menu();
				_show_adventure_menu();
			});
			app.vent.on('adventure:leave', function(){
				_hide_canvas();
				_hide_controls();
				_hide_dm_only();
				_hide_adventure_top_nav();
				_show_dungeon_menu();
				_show_adventure_menu();
			});

			app.reqres.setHandler('dashboard:dungeonname', _get_dungeon_name);
			app.reqres.setHandler('dashboard:canvaswidth', _get_canvas_width);
			app.reqres.setHandler('dashboard:canvasheight', _get_canvas_height);
			app.reqres.setHandler('dashboard:dungeonscale', _get_dungeon_scale);
			app.reqres.setHandler('dashboard:dungeongridwidth', _get_dungeon_grid_width);
			app.reqres.setHandler('dashboard:dungeongridheight', _get_dungeon_grid_height);
			app.reqres.setHandler('dashboard:circleradius', function(){return $('.js-circle-radius').val() * app.request('config', 'cellSize');})

			app.commands.setHandler('dashboard:setname', _set_dungeon_name);
			app.commands.setHandler('dashboard:showcanvas', _show_canvas);
			app.commands.setHandler('dashboard:hidecanvas', _hide_canvas);
		});
	});
});
