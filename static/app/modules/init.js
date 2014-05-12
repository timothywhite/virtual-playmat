define(['jquery', 'app'], function(){
	$(function(){
		$('.canvas-wrap').height(window.innerHeight - ($('.navbar').outerHeight() + 20))
			.css({'margin-top': $('.navbar').outerHeight()});
		app.execute('stage:resize');
	});
});
