define(['marionette','app','module/init'], function(){
	app.module("Dashboard", function(Dashboard, app, Backbone, Marionette, $, _){
		$(function(){
			//Tool selection click events
			$('.js-button-tool-line').click(function(){
				app.execute('config:set', 'toolMode', 'line'); 
			});	
			$('.js-button-tool-erase').click(function(){
				app.execute('config:set', 'toolMode', 'erase'); 
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
			app.reqres.setHandler('dashboard:name', function(){
				return $('.js-dungeon-name').html();
			});
			app.commands.setHandler('dashboard:setname', function(name){
				$('.js-dungeon-name').html(name);
			});	
			app.commands.setHandler('dashboard:showcanvas', function(){
				$('.canvas-wrap').show();
			});
			app.commands.setHandler('dashboard:hidecanvas', function(){
				$('.canvas-wrap').hide();
			});
			$(window).resize(function(e){
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
						app.execute('dungeon:load', $(this).data('_id'));
						app.execute('dashboard:setname',$(this).data('name'));
						app.execute('dashboard:showcanvas');
					});
				});
			});
			$('.js-dungeon-create').click(function(e){
				var name = $('.js-dungeon-create-name').val(),
				    gridWidth = $('.js-dungeon-create-grid-width').val(),
				    gridHeight = $('.js-dungeon-create-grid-height').val();
				if(name && gridWidth && gridHeight){
					app.execute('dungeon:create', name, gridWidth, gridHeight);
					$('.canvas-wrap').show();
				}else{
					console.log('fill out the form.');
				}
			});
			$('.js-dungeon-delete').click(function(e){
				app.execute('dungeon:delete');
				app.execute('dashboard:hidecanvas');
				app.execute('dashboard:setname','');
			});
			$('.js-dungeon-save').click(function(e){
				app.execute('dungeon:save');
			});
		});
	});
});
