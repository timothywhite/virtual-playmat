define(['jquery', 'app'], function($, app){
	$(function(){
		$('.canvas-wrap').height(window.innerHeight - ($('.navbar').outerHeight() + $('.controls').outerHeight()))
			.css({'margin-top': $('.navbar').outerHeight()});
		app.execute('stage:resize');
		var socket = io.connect('http://timwhite.org:8001');
  		socket.on('test', function (data) {
    			console.log(data);
    			socket.emit('test', { my: 'data' });
  		});		
	});
});
