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
			//load dungeon click event
			$('.js-load-dungeon').click(function(){
				app.execute('dungeon:load', '537039f67e168774776ebf13');
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
				app.execute('stage:resize');	
			});

			$('.form-dropdown').click(function(e){
				e.stopPropagation();
			});
			$('.js-dungeon-search').keyup(function(e){
				app.request('dungeon:search', $(this).val(), function(dungeons){
					$list = $('.js-dungeon-results').html('');
					dungeons.forEach(function(dungeon){
						$list.append('<li><a class="js-dungeon-link" href="#" data-_id= "' + dungeon._id + '">' + dungeon.name + '</a></li>');
					});

					$('.js-dungeon-link').click(function(e){
						app.execute('dungeon:load', $(this).data('_id'));
					});
				});
			});
		});
	});
});
