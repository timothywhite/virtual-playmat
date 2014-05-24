define(['app', 'kinetic', 'module/init','module/dashboard'], function(app, Kinetic){
	app.module('Stage', function(Stage, app, Backbone, Marionette, $, _){
		var stage = new Kinetic.Stage({
			container: app.request('config','stageContainer'),
			width: app.request('dashboard:canvaswidth'),
			height: app.request('dashboard:cavasheight'),
			draggable: true
		});
		app.reqres.setHandler('stage', function(){
			return stage;
		});
		
		app.commands.setHandler('stage:setdraggable', function(draggable){
			stage.draggable(draggable);
		});
		app.commands.setHandler('stage:reset', function(){
			stage.x(0);
			stage.y(0);
		});
		app.commands.setHandler('stage:add', function(node){
			stage.add(node);
		});
		app.commands.setHandler('stage:resize', function(){
			stage.width(app.request('dashboard:canvaswidth'));
			stage.height(app.request('dashboard:canvasheight'));
		});
		app.commands.setHandler('stage:setscale',function(scale){
			stage.scale({x:scale,y:scale});
			stage.draw();
		});
		
		app.execute('stage:resize');
	});
});
