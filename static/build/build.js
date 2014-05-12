{
        baseUrl: "../assets/js",
	out: 'app-build.js',
	name: '../../main',

        paths: {
                'app': '../../app/app',
                'module': '../../app/modules',
		'requireLib': 'require'
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
                }
        },
	include: 'requireLib'
}
