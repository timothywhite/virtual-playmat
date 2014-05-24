define(['app', 'socket.io', 'module/init'], function(app, io){
	app.module("Socket", function(Socket, app, Backbone, Marionette, $, _){
		var socket,
			_connect = function(){
				socket = io.connect('http://timwhite.org:8001');
				socket.on('test', function (data) {
					console.log(data);
					socket.emit('test', { my: 'data' });
				});
			}
	});
});
