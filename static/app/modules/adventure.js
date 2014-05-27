define(['app', 'socket.io', 'module/init'], function(app, io){
	app.module("Adventure", function(Adventure, app, Backbone, Marionette, $, _){
		var BASE_API_URL = '/api/adventures/',
			isJoined = false,
			isDm = false,
			socket, readyCallback,
		_join_adventure = function(id){
			socket.emit('join', {adventure:id});
		},
		_ready = function(data){
			isJoined = true;
			isDm = localStorage.getItem('user_id') === data.dm;
			app.execute('dungeon:load', data.dungeon);
			socket.on('update', function(data){
				for(layer in data){
					app.execute('layer:load', layer, data[layer]);
				}
			});
			if(readyCallback) readyCallback(data.dungeon);
		},
		_connect = function(){
			if (!socket) socket = io.connect('http://timwhite.org:8001');
			socket.on('ready', _ready);
		};
		app.vent.on('draw:update', function(){
			if(isJoined){
				socket.emit('update', {
					draw: app.request('layer', 'draw').toObject()
				});
			}
		});
		app.vent.on('figure:update', function(){
			if(isJoined){
				socket.emit('update', {
					draw: app.request('layer', 'figure').toObject()
				});
			}
		});
		app.vent.on('reveal:update', function(){
			if(isJoined){
				socket.emit('update', {
					draw: app.request('layer', 'reveal').toObject()
				});
			}
		});
		app.commands.setHandler('adventure:create', function(name, callback){
			_connect();
			readyCallback = callback;
			adventure = {
				dm: localStorage.getItem('user_id'),
				name: name,
				dungeon: app.request('dungeon:getcurrent')
			};
			$.post(BASE_API_URL, adventure, function(data, status, xhr){
				_join_adventure(data._id);
			});
		});
		app.commands.setHandler('adventure:join', function(id, callback){
			_connect();
			readyCallback = callback;
			_join_adventure(id);
		});
		app.reqres.setHandler('adventure:search', function(name, callback){
                        $.get(BASE_API_URL + 'search?name=' + name, function(data, status, xhr){
                                console.log(data);
                                callback(data);
                        }, 'json');
                });	
		app.reqres.setHandler('adventure:isdm', function(){
			return isDm;
		});
	});
});
