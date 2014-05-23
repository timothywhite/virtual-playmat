define(['jquery', 'app'], function(){
	$(function(){
		$('.canvas-wrap').height(window.innerHeight - ($('.navbar').outerHeight() + $('.controls').outerHeight()))
			.css({'margin-top': $('.navbar').outerHeight()});
		app.execute('stage:resize');

		
	});
});
