define(['app', 'kinetic', 'module/stage'],function(app, Kinetic){
	app.module('Layers', function(Layers, app, Backbone, Marionette, $, _){
		var layers = {
			grid: {layer: new Kinetic.Layer(), index: 0},
			draw: {layer: new Kinetic.Layer(), index: 1},
			reveal: {layer: new Kinetic.Layer(), index: 2},
			hit: {layer: new Kinetic.Layer(), index: 3},
			ui: {layer: new Kinetic.Layer(), index: 4},
			figure: {layer: new Kinetic.Layer(), index: 5},
		}
		for(name in layers){
			app.execute('stage:add', layers[name].layer);
			layers[name].layer.setZIndex(layers[name].index);
		}

		app.reqres.setHandler('layer', function _get_layer(name){
			return layers[name].layer;
		});

		app.commands.setHandler('layer:load', function _load_layer(name, json){
			var layer = Kinetic.Node.create(JSON.stringify(json));
			layers[name].layer.destroy();
			layers[name].layer = layer;

			app.vent.trigger('layer:before:load:' + name);

			app.execute('stage:add', layer);
			layer.setZIndex(layers[name].index)

			app.vent.trigger('layer:load:' + name);
		});

	});
});
