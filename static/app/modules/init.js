define(['jquery', 'app'], function($, app){
	$(function(){
		$('.canvas-wrap').height(window.innerHeight - ($('.navbar').outerHeight() + $('.controls').outerHeight()))
			.css({'margin-top': $('.navbar').outerHeight()});
		app.execute('stage:resize');
	});
});
