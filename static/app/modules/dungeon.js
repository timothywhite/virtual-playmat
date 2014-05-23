define(['marionette', 'kinetic', 'app', 'module/layers'], function(){
	app.module("Dungeon", function(Dungeon, app, Backbone, Marionette, $, _){
		var BASE_API_URL = '/api/dungeons/',
			currentDungeonId;
		
		function _load_dungeon(data){
			currentDungeonId = data._id;
			app.execute('stage:reset');
			app.execute('config:setgrid', data.gridWidth, data.gridHeight);
			app.execute('layer:load', 'draw', data.layers.draw);
			app.execute('layer:load', 'figure', data.layers.figure);
			app.execute('layer:load', 'reveal', data.layers.reveal);
		}
	
		app.commands.setHandler('dungeon:load', function(id, callback){
			$.get('/api/dungeons/' + id, function(data, status, xhr){
				console.log(data);
				_load_dungeon(data);
				callback(data);
			}, 'json');
		});
		
		app.commands.setHandler('dungeon:create', function(name, gridWidth, gridHeight){
			dungeon = {
				dm: localStorage.getItem('user_id'),
				name: name,
				gridWidth: gridWidth,
				gridHeight: gridHeight,
				layers: {
					draw: (new Kinetic.Layer()).toObject(),
					figure: (new Kinetic.Layer()).toObject()
				}
			}
			$.post(BASE_API_URL, dungeon, function(data, status, xhr){
				app.execute('dashboard:setname', data.name);
				_load_dungeon(data);
			});
		});
		
		app.commands.setHandler('dungeon:save', function(){
			$.ajax({
				url: BASE_API_URL + currentDungeonId,
				type: 'PUT',
				data: {
					name: app.request('dashboard:dungeonname'),
					gridWidth: app.request('dashboard:dungeongridwidth'),
					gridHeight: app.request('dashboard:dungeongridheight'),
					layers: {
						draw: app.request('layer', 'draw').toObject(),
						figure: app.request('layer', 'figure').toObject(),
						reveal: app.request('layer', 'reveal').toObject()
					}
				},
				success: function(data, status, xhr){
					console.log(data);
				}
			});
		});
		
		app.commands.setHandler('dungeon:delete', function(){
			$.ajax({
				url: BASE_API_URL + currentDungeonId,
				type: 'DELETE',
				success: function(data, status, xhr){
						console.log(data);
				}
			});
		});
		
		app.reqres.setHandler('dungeon:search', function(name, callback){
			$.get(BASE_API_URL + 'search?dm=' + localStorage.getItem('user_id') + '&name=' + name, function(data, status, xhr){
				console.log(data);
				callback(data);
			}, 'json');
		});
	});
});
