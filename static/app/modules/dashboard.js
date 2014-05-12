define(['marionette','app','module/init'], function(){
	app.module("Dashboard", function(Dashboard, app, Backbone, Marionette, $, _){
		$(function(){
			$('.js-shape-color').change(function(){
				app.execute('draw:set:shapecolor',$(this).val());
			});
			$('.js-load-dungeon').click(function(){
				app.execute('dungeon:load', '537039f67e168774776ebf13');
			});
			$('.js-add-figure').click(function(){
				app.execute('figure:add', {
					fill: $('.js-figure-fill-color').val(), 
					stroke: $('.js-figure-stroke-color').val(), 
					label: $('.js-figure-label').val()
				});
			});
		});
	});
});