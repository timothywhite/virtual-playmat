require.config({
	baseUrl: "assets/js",
		paths: {
			'app': '../../app/app',
			'module': '../../app/modules',
			'socket.io': '../../socket.io/socket.io'
		},
	shim: {
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone',
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'kinetic': {
			exports: 'Kinetic'
		},
		'socket.io':{
			exports: 'io'
		}
	}
});

require([
	'app',
	'module/init',
	'module/stage',
	'module/layers',
	'module/grid', 
	'module/ui', 
	'module/draw',
	'module/figures',
	'module/reveal',
	'module/dashboard',
	'module/dungeon',
	'module/adventure',
	'bootstrap',
	'socket.io'
]);
