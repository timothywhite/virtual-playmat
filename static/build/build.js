{
        baseUrl: "../assets/js",
	out: 'app-build.js',
	name: '../../main',
        paths: {
                'app': '../../app/app',
                'module': '../../app/modules',
		'requireLib': 'require',
		'socket.io': '../../../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io'
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
        },
	include: 'requireLib'
}
