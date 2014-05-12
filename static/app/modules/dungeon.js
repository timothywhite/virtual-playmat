define(['marionette', 'kinetic', 'app', 'module/layers'], function(){
	app.module("Dungeon", function(Dungeon, app, Backbone, Marionette, $, _){
		
		app.commands.setHandler('dungeon:load', function(id){
			$.get('/api/dungeons/' + id, function(data, status, xhr){
				console.log(data);
				app.execute('config:setgrid', data.gridWidth, data.gridHeight);
				app.execute('layer:load', 'draw', data.layers.draw);
				app.execute('layer:load', 'figure', data.layers.figure);
			}, 'json');
		});
		
		app.commands.setHandler('dungeon:save', function(){
			
		});
	});
});