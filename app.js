var express = require('express'),
	path = require('path'),
	favicon = require('static-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	restful = require('node-restful'),
	mongoose = restful.mongoose,
	app = express(),
	server = module.exports = require('http').createServer(app),
	io = require('socket.io').listen(server);
	
mongoose.connect('mongodb://localhost/dnd');
app.set('db','dnd');

//set dev boolean for template to determine whether it should serve the built source or not.
app.set('dev', app.get('env') === 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

/*****Middleware***********************************************************************/
app.use(favicon('/assets/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
	secret: '908374091834710934816150',
	store: new MongoStore({
		db: app.get('db')
	})
}));
app.use(express.static(path.join(__dirname, 'static')));

//Require a login for all routes exept the login page.
app.use(function requireLogin(req, res, next){
	if (req.path === '/users/login' || req.session.user) next(); 
        else res.redirect('/users/login')
});

/****** Routes *********************************************/
var routes = require('./routes/index');
var users = require('./routes/users');
app.use('/', routes);
app.use('/users', users);

/*******API Routes****************************************/
var Dungeon = require('./models/dungeon');
Dungeon.register(app, '/api/dungeons');

var Adventure = require('./models/adventure');
Adventure.register(app, '/api/adventures');

/******* Socket IO ***************************************/
io.sockets.on('connection', function(socket){
	socket.on('join', function(data){
		socket.join(data.id);
		socket.set('adventure', data.id, function(){
			Adventure.findById(data.id, function(err, adventure){
				socket.emit('ready', adventure);
			});
		});
	});
	socket.on('update', function(data){
		var update = {};
		for (layer in data.layers){
			update['dungeon.layers.' + layer] = data.layers[layer];
		}
		Adventure.update({_id: data.id}, update, {},  function(err, adventure){
			socket.broadcast.to(data.id).emit('update', data.layers);
		});
	});
	socket.on('change dungeon', function(data){
		Adventure.update({_id: data.id}, {dungeon: data.dungeon}, {}, function(err, adventure){
			socket.broadcast.to(data.id).emit('change dungeon', data.dungeon);
		});
	});
	socket.on('end', function(data){
		Adventure.findByIdAndRemove(data.id, {}, function(err, adventure){
			socket.broadcast.to(data.id).emit('end');
		});
	});

});

/******Error Handling**************************************/
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

