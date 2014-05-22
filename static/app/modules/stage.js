define(['marionette', 'kinetic', 'app', 'module/init'], function(){
	app.module('Stage', function(Stage, app, Backbone, Marionette, $, _){
		var stage = new Kinetic.Stage({
			container: app.request('config','stageContainer'),
			width: $('.canvas-wrap').width(),
			height: $('.canvas-wrap').height(),
			draggable: true
		});
		app.reqres.setHandler('stage', function(){
			return stage;
		});
		app.commands.setHandler('stage:reset', function(){
			stage.x(0);
			stage.y(0);
		});
		app.commands.setHandler('stage:add', function(node){
			stage.add(node);
		});
		app.commands.setHandler('stage:resize', function(){
			stage.width($('.canvas-wrap').width());
			stage.height($('.canvas-wrap').height());
		});
	});
});
